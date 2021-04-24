import { DateService, Month } from './../../../../../../services/shared-services/date.service';
import { CategoryModel } from '../../../../../../models/branch.model';
import { CourseService } from './../../../../../../services/course.service';
import { BatchService } from './../../../../../../services/batch.service';
import { BatchModel } from '../../../../../../models/batch.model';
import { CourseModel, SubjectModel } from '../../../../../../models/course.model';
import { ExamService } from './../../../../../../services/exam.service';
import { ExamModel } from '../../../../../../models/exam.model';
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-manage-batch-test',
  templateUrl: './manage-batch-test.component.html',
  styleUrls: ['./manage-batch-test.component.scss'],
})
export class ManageBatchTestComponent implements OnInit {
  loading: boolean;
  branchId: string;
  exams: ExamModel[];

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
    private toastrService: NbToastrService,
    public dateService: DateService,
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.branchService.getCategoryData().subscribe((category: CategoryModel) => {
      this.category = category;
    });

    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      this.course = course;
    });

    this.batchService.getBatchData().subscribe((batch: BatchModel) => {
      this.batch = batch;
    });

    this.subjects = [];
    this.subject = '';
    this.batch.subjects.forEach((curSubject: any) => {
      const mySubject = this.course.subjects.find(
        (subject: SubjectModel) => subject._id === curSubject.subject,
      );
      this.subjects.push(mySubject);
    });

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = (this.dateService.getDate().getMonth() + 1).toString().padStart(2, '0');
    this.year = this.years[this.years.length - 1];

    this.getExams();
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.getExams();
  }

  onSelectYear(year: string) {
    this.year = year;
    if (year === '') {
      this.month = '';
    }
    this.getExams();
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    this.getExams();
  }

  getExams() {
    this.loading = true;

    this.examService
      .getExams(
        this.branchId,
        this.category._id,
        this.course._id,
        this.batch._id,
        this.subject,
        this.month,
        this.year,
      )
      .subscribe(
        (exams: ExamModel[]) => {
          this.exams = exams;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
  }

  addExam() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  addExamScore(exam: ExamModel) {
    this.examService.setExamData(exam);
    this.router.navigate(['../score'], { relativeTo: this.route });
  }

  editExam(exam: ExamModel) {
    this.examService.setExamId(exam._id);
    this.examService.setExamData(exam);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  deleteExam(exam: string, i: number) {
    this.loading = true;
    this.examService.deleteExam(exam).subscribe(
      (res: any) => {
        this.exams.splice(i, 1);
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  changeExamStatus(exam: string, status: boolean, i: number) {
    // this.loading = true
    // this.examService.changeExamStatus(exam, status).subscribe(
    //   (res: any) => {
    //     this.exams[i].status = status;
    //     this.loading = false
    //   },
    //   (error: any) => {
    //     this.showToastr('top-right', 'danger', error);
    //     this.loading = false;
    //   },
    // );
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
