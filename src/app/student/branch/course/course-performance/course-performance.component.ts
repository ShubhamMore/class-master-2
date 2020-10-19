import { ExamService } from './../../../../services/exam.service';
import { BatchService } from './../../../../services/batch.service';
import { StudentCourseModel } from './../../../../models/student-course.model';
import { SubjectModel } from './../../../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentCourseService } from './../../../../services/student-course.service';
import { NbToastrService } from '@nebular/theme';
import { BranchService } from './../../../../services/branch.service';
import { DateService, Month } from './../../../../services/shared-services/date.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-course-performance',
  templateUrl: './course-performance.component.html',
  styleUrls: ['./course-performance.component.scss'],
})
export class CoursePerformanceComponent implements OnInit {
  private branchId: string;

  private studentCourse: StudentCourseModel;

  loading: boolean;

  scores: any[];

  subjects: SubjectModel[];
  subject: string;

  months: Month[];
  month: string;

  years: string[];
  year: string;

  constructor(
    public dateService: DateService,
    private branchService: BranchService,
    private batchService: BatchService,
    private toastrService: NbToastrService,
    private studentCourseService: StudentCourseService,
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
    this.studentCourseService
      .getStudentCourseData()
      .subscribe((studentCourse: StudentCourseModel) => {
        this.studentCourse = studentCourse;
      });

    if (!this.studentCourse) {
      this.showToastr('top-right', 'danger', 'Student Course Not Found');
      this.back();
      return;
    }

    this.scores = [];

    this.subjects = [];
    this.subject = '';

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = (this.dateService.getDate().getMonth() + 1).toString().padStart(2, '0');
    this.year = this.years[this.years.length - 1];

    this.batchService
      .getBatchSubjects(this.studentCourse.course, this.studentCourse.batch)
      .subscribe(
        (subjects: SubjectModel[]) => {
          this.subjects = subjects;
          this.getStudentCourseScore();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.back();
        },
      );
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.getStudentCourseScore();
  }

  onSelectYear(year: string) {
    this.year = year;
    if (year === '') {
      this.month = '';
    }
    this.getStudentCourseScore();
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    this.getStudentCourseScore();
  }

  getStudentCourseScore() {
    this.loading = true;
    this.examService
      .getStudentCourseScore(
        this.subject,
        this.month,
        this.year,
        this.studentCourse.student,
        this.studentCourse._id,
      )
      .subscribe(
        (scores: any[]) => {
          this.scores = scores;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.back();
        },
      );
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
