import { OnlineExamResultModel } from '../../../../../models/online-exam-result.model';
import { NbToastrService } from '@nebular/theme';
import { BranchService } from './../../../../../services/branch.service';
import { OnlineExamQuestionService } from './../../../../../services/online-exam-question.service';
import { AuthService } from './../../../../../authentication/auth/auth-service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnlineExamService } from './../../../../../services/online-exam.service';
import { OnlineExamModel } from '../../../../../models/online-exam.model';
import { OnlineExamQuestionModel } from '../../../../../models/online-exam-question.model';
import { Router, ActivatedRoute } from '@angular/router';

interface StudentQuestionAnswers {
  questionId: string;
  questionIndex: number;
  answerIds: string[];
}

@Component({
  selector: 'ngx-online-test-question',
  templateUrl: './online-test-question.component.html',
  styleUrls: ['./online-test-question.component.scss'],
})
export class OnlineTestQuestionComponent implements OnInit, OnDestroy {
  loading: boolean;

  branchId: string;

  onlineExam: OnlineExamModel;
  questions: OnlineExamQuestionModel[];

  examInterval: any;

  currentQuestion: OnlineExamQuestionModel;
  currentQuestionIndex: number;
  studentQuestionAnswers: StudentQuestionAnswers[];

  onlineExamResult: any;
  calculatingResult: boolean;

  examCountDownTimer: string;
  waitingToStart: string;
  examStarted: boolean;
  examSubmitted: boolean;

  examStartTime: number;
  examEndTime: number;
  examTimeUp: boolean;

  constructor(
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private onlineExamService: OnlineExamService,
    private onlineExamQuestionService: OnlineExamQuestionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.waitingToStart = 'loading';

    this.onlineExamService.getOnlineExamData().subscribe((onlineExam: OnlineExamModel) => {
      if (!onlineExam) {
        this.back();
        return;
      }
      this.onlineExam = onlineExam;
    });

    this.questions = [];

    this.onlineExamService.getOnlineExamResult(this.onlineExam._id).subscribe(
      (onlineExamResult: OnlineExamResultModel) => {
        if (onlineExamResult) {
          this.onlineExamResult = onlineExamResult;
          this.waitingToStart = null;
          this.examStarted = true;
          this.examSubmitted = true;
          this.calculatingResult = false;
        } else {
          const startTime = this.onlineExam.date + 'T' + this.onlineExam.time;
          const countDownDate = new Date(startTime).getTime();
          this.examStartTime = countDownDate;
          this.examStarted = false;
          this.examSubmitted = false;
          this.examTimeUp = false;

          // Set Interval
          const interval = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime();
            // Find the distance time between current date and the count down date
            const distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an 'waitingToStart' object variable
            this.waitingToStart = hours + 'H ' + minutes + 'M ' + seconds + 'S ';

            if (distance < 0) {
              // Clear Interval
              clearInterval(interval);
              this.waitingToStart = null;
            }
            if (this.loading) {
              this.loading = false;
            }
          }, 1000);
        }

        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  getDate(date: string) {
    date = new Date(date).toString();
    return date.substring(0, 3) + ', ' + date.substring(4, 15);
  }

  getTime(time: string) {
    const hours = +time.split(':')[0];
    const minutes = time.split(':')[1];
    if (+hours > 12) {
      return (+hours - 12).toString().padStart(2, '0') + ':' + minutes + ' PM';
    }
    return hours.toString().padStart(2, '0') + ':' + minutes + ' AM';
  }

  startExam() {
    this.onlineExamQuestionService.getOnlineExamQuestionsForStudent(this.onlineExam._id).subscribe(
      (onlineExamQuestions: OnlineExamQuestionModel[]) => {
        this.questions = onlineExamQuestions;

        this.waitingToStart = null;
        this.examStarted = true;
        this.studentQuestionAnswers = [];
        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questions[0];

        // Buffer time in millisecond (For calculating Exam Data)
        const bufferTime = 0 * 1000;
        const duration = +this.onlineExam.duration * 60 * 1000;
        const currentTime: number = new Date().getTime();

        const endTime: number = this.examStartTime + duration + bufferTime;
        const differenceTime = endTime - currentTime;

        if (differenceTime >= duration) {
          this.examEndTime = currentTime + duration;
        } else if (endTime > currentTime) {
          this.examEndTime = this.examStartTime + duration + bufferTime;
          this.examCountDown();
        } else {
          this.examEndTime = null;
          this.examTimeUp = true;
          this.submitExam();
        }
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  examCountDown() {
    this.examInterval = setInterval(async () => {
      // Get today's date and time
      const now = new Date().getTime();
      // Find the distance time between current date and the count down date
      const distance = this.examEndTime - now;
      // Time calculations for days, hours, minutes and seconds
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an 'CountDown' object variable
      this.examCountDownTimer = hours + 'H ' + minutes + 'M ' + seconds + 'S ';

      if (distance < 0) {
        this.examCountDownTimer = null;
        this.examTimeUp = true;
        this.submitExam();
      }
    }, 1000);
  }

  previousQuestion() {
    this.currentQuestionIndex -= 1;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  nextQuestion() {
    this.currentQuestionIndex += 1;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  markAnswer(
    questionId: string,
    questionIndex: number,
    answerId: string,
    answerIndex: number,
    mark: boolean,
  ) {
    const index = this.studentQuestionAnswers.findIndex(
      (curAnswer: any) => curAnswer.questionId === questionId,
    );

    if (mark) {
      if (index < 0) {
        const studentQuestionAnswers: StudentQuestionAnswers = {
          questionId,
          questionIndex,
          answerIds: [],
        };
        studentQuestionAnswers.answerIds.push(answerId);
        this.studentQuestionAnswers.push(studentQuestionAnswers);
      } else {
        const studentQuestionAnswers = this.studentQuestionAnswers[index];
        studentQuestionAnswers.answerIds.push(answerId);
        this.studentQuestionAnswers[index] = studentQuestionAnswers;
      }
    } else {
      if (index > -1) {
        const studentQuestionAnswers: StudentQuestionAnswers = this.studentQuestionAnswers[index];
        const ansIndex = studentQuestionAnswers.answerIds.findIndex(
          (curAnsId: any) => curAnsId.answerId === answerId,
        );
        studentQuestionAnswers.answerIds.splice(ansIndex, 1);
        this.studentQuestionAnswers[index] = studentQuestionAnswers;
      }
    }
  }

  submitExam() {
    let confirm = true;
    if (!this.examTimeUp) {
      confirm = window.confirm('Do you want to Submit the Exam?');
    }
    if (!confirm) {
      return;
    }
    this.calculatingResult = true;
    this.examSubmitted = true;
    this.currentQuestion = null;
    this.currentQuestionIndex = null;

    // Clear Interval
    clearInterval(this.examInterval);

    this.examCountDownTimer = null;

    this.onlineExamService
      .saveOnlineExamResult(this.studentQuestionAnswers, this.onlineExam._id)
      .subscribe(
        (res: any) => {
          this.onlineExamResult = res.onlineExamResult;
          if (res.type === 0) {
            this.showToastr('top-right', 'success', 'Exam Submitted Successfully!');
          }
          this.calculatingResult = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
        },
      );
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    clearInterval(this.examInterval);
  }
}
