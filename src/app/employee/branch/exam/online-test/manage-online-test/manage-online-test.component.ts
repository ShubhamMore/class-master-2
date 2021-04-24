import { NbToastrService } from '@nebular/theme';
import { CourseService } from './../../../../../services/course.service';
import { BatchService } from './../../../../../services/batch.service';
import { CategoryModel } from '../../../../../models/branch.model';
import { BatchModel } from '../../../../../models/batch.model';
import { Month, DateService } from './../../../../../services/shared-services/date.service';
import { SubjectModel, CourseModel } from '../../../../../models/course.model';
import { Component, OnInit } from '@angular/core';
import { OnlineExamService } from './../../../../../services/online-exam.service';
import { OnlineExamModel } from '../../../../../models/online-exam.model';
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

  category: CategoryModel;
  course: CourseModel;
  batch: BatchModel;

  subjects: SubjectModel[];
  subject: string;

  months: Month[];
  month: string;

  years: string[];
  year: string;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private batchService: BatchService,
    public dateService: DateService,
    private toastrService: NbToastrService,
    private onlineExamService: OnlineExamService,
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

    this.onlineExams = [];

    this.branchService.getCategoryData().subscribe((category: CategoryModel) => {
      this.category = category;
    });

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = (this.dateService.getDate().getMonth() + 1).toString().padStart(2, '0');
    this.year = this.years[this.years.length - 1];

    this.subjects = [];
    this.subject = '';

    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      this.course = course;
      this.batchService.getBatchData().subscribe((batch: BatchModel) => {
        this.batch = batch;
        if (course && batch) {
          this.batch.subjects.forEach((curSubject: any) => {
            const mySubject = this.course.subjects.find(
              (subject: SubjectModel) => subject._id === curSubject.subject,
            );
            this.subjects.push(mySubject);
          });
          this.searchOnlineExam();
        }
      });
    });
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.searchOnlineExam();
  }

  onSelectYear(year: string) {
    this.year = year;
    if (year === '') {
      this.month = '';
    }
    this.searchOnlineExam();
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    this.searchOnlineExam();
  }

  searchOnlineExam() {
    this.loading = true;
    this.onlineExamService
      .getOnlineExams(
        this.branchId,
        this.category._id,
        this.course._id,
        this.batch._id,
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
          this.loading = false;
        },
      );
  }

  addOnlineExam() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  editOnlineExam(onlineExam: OnlineExamModel) {
    this.onlineExamService.setOnlineExamId(onlineExam._id);
    this.onlineExamService.setOnlineExamData(onlineExam);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  onlineExamQuestions(onlineExam: OnlineExamModel) {
    this.onlineExamService.setOnlineExamId(onlineExam._id);
    this.onlineExamService.setOnlineExamData(onlineExam);
    this.router.navigate(['../question'], { relativeTo: this.route });
  }

  changeOnlineExamStatus(id: string, status: boolean, i: number) {
    this.loading = true;
    this.onlineExamService.changeOnlineExamStatus(id, status).subscribe(
      (res: any) => {
        this.onlineExams[i].status = status;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  deleteOnlineExam(id: string, i: number) {
    this.loading = true;
    this.onlineExamService.deleteOnlineExam(id).subscribe(
      (res: any) => {
        this.onlineExams.splice(i, 1);
        this.loading = false;
      },
      (error: any) => {
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
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
