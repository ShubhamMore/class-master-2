import { OnlineExamQuestionService } from './../../../../../../services/online-exam-question.service';
import { NbToastrService } from '@nebular/theme';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnlineExamService } from './../../../../../../services/online-exam.service';
import { OnlineExamQuestionModel } from '../../../../../../models/online-exam-question.model';
import { OnlineExamModel } from '../../../../../../models/online-exam.model';
import { BranchService } from './../../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-manage-online-test-questions',
  templateUrl: './manage-online-test-questions.component.html',
  styleUrls: ['./manage-online-test-questions.component.scss'],
})
export class ManageOnlineTestQuestionsComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  onlineExam: OnlineExamModel;
  onlineExamQuestions: OnlineExamQuestionModel[];

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
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.onlineExamQuestions = [];

    this.onlineExamService.getOnlineExamData().subscribe((onlineExam: OnlineExamModel) => {
      this.onlineExam = onlineExam;

      if (!onlineExam) {
        this.back();
        return;
      }

      this.onlineExamQuestionService.getOnlineExamQuestions(onlineExam._id).subscribe(
        (onlineExamQuestions: OnlineExamQuestionModel[]) => {
          this.onlineExamQuestions = onlineExamQuestions;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);

          this.loading = false;
        },
      );
    });
  }

  addOnlineExamQuestion() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  editOnlineExamQuestion(onlineExamQuestion: OnlineExamQuestionModel) {
    this.onlineExamQuestionService.setOnlineExamQuestionId(onlineExamQuestion._id);
    this.onlineExamQuestionService.setOnlineExamQuestionData(onlineExamQuestion);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  changeOnlineExamQuestionStatus(id: string, status: boolean, i: number) {
    this.loading = true;
    this.onlineExamQuestionService.changeOnlineExamQuestionStatus(id, status).subscribe(
      (res: any) => {
        this.onlineExamQuestions[i].status = status;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  deleteOnlineExamQuestion(id: string, i: number) {
    this.loading = true;
    this.onlineExamQuestionService.deleteOnlineExamQuestion(id).subscribe(
      (res: any) => {
        this.onlineExamQuestions.splice(i, 1);
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
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
    this.router.navigate(['../../manage'], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
