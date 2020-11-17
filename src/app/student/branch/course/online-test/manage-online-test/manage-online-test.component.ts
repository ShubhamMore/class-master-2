import { SubjectService } from './../../../../../services/subject.service';
import { SubjectModel } from './../../../../../models/course.model';
import { OnlineExamModel } from './../../../../../models/online-exam.model';
import { OnlineExamService } from './../../../../../services/online-exam.service';
import { StudentBranchService } from './../../../student-branch.service';
import { StudentCourseService } from './../../../../../services/student-course.service';
import { StudentCourseModel } from './../../../../../models/student-course.model';
import { NbToastrService } from '@nebular/theme';
import { LectureService } from './../../../../../services/lecture.service';
import { DateService, Month } from './../../../../../services/shared-services/date.service';
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-manage-online-test',
  templateUrl: './manage-online-test.component.html',
  styleUrls: ['./manage-online-test.component.scss'],
})
export class ManageOnlineTestComponent implements OnInit {
  loading: boolean;
  branchId: string;

  onlineExams: OnlineExamModel[];
  studentCourse: StudentCourseModel;

  months: Month[];
  month: string;

  years: string[];
  year: string;

  subjects: SubjectModel[];
  subject: string;

  constructor(
    private branchService: BranchService,
    private subjectService: SubjectService,
    private onlineExamService: OnlineExamService,
    private studentBranchService: StudentBranchService,
    private studentCourseService: StudentCourseService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.studentBranchService.setType('lecture');

    this.onlineExams = [];
    this.subjects = [];
    this.subject = '';

    this.subjectService.getSubjectsData().subscribe((subjects: SubjectModel[]) => {
      this.subjects = subjects;
    });

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = (this.dateService.getDate().getMonth() + 1).toString().padStart(2, '0');
    this.year = this.years[this.years.length - 1];

    this.studentCourseService
      .getStudentCourseData()
      .subscribe((studentCourse: StudentCourseModel) => {
        this.studentCourse = studentCourse;

        if (studentCourse) {
          this.getOnlineExam();
        } else {
          this.back();
        }
      });
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    this.getOnlineExam();
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.getOnlineExam();
  }

  onSelectYear(year: string) {
    this.year = year;
    if (year === '') {
      this.month = '';
    }
    this.getOnlineExam();
  }

  getTime(startTime: string, endTime: string) {
    startTime = this.dateService.formatTime(startTime);
    endTime = this.dateService.formatTime(endTime);
    return startTime + ' - ' + endTime;
  }

  startExam(onlineExam: OnlineExamModel) {
    this.onlineExamService.setOnlineExamId(onlineExam._id);
    this.onlineExamService.setOnlineExamData(onlineExam);
    this.router.navigate(['../start'], { relativeTo: this.route });
  }

  getOnlineExam() {
    this.loading = true;

    this.onlineExamService
      .getOnlineExamsForStudent(
        this.branchId,
        this.studentCourse.category,
        this.studentCourse.course,
        this.studentCourse.batch,
        this.subject,
        this.month,
        this.year,
      )
      .subscribe(
        (onlineExams: OnlineExamModel[]) => {
          this.onlineExams = onlineExams;
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

  getSubject(subjectId: string) {
    const subject = this.subjects.find((curSubject: SubjectModel) => curSubject._id === subjectId);
    if (subject) {
      return subject.subject;
    }
    return '--';
  }

  back() {
    const type = this.studentBranchService.getType();
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: { type } });
  }
}
