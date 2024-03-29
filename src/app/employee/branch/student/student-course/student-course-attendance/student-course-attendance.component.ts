import { BatchService } from './../../../../../services/batch.service';
import { StudentCourseModel } from '../../../../../models/student-course.model';
import { SubjectModel } from '../../../../../models/course.model';
import { AttendanceService } from './../../../../../services/attendance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentCourseService } from './../../../../../services/student-course.service';
import { StudentService } from './../../../../../services/student.service';
import { NbToastrService } from '@nebular/theme';
import { BranchService } from './../../../../../services/branch.service';
import { DateService, Month } from './../../../../../services/shared-services/date.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-student-course-attendance',
  templateUrl: './student-course-attendance.component.html',
  styleUrls: ['./student-course-attendance.component.scss'],
})
export class StudentCourseAttendanceComponent implements OnInit {
  private branchId: string;
  private categoryId: string;
  private studentCourseId: string;
  private studentId: string;

  private studentCourse: StudentCourseModel;

  loading: boolean;

  attendance: any[];

  subjects: SubjectModel[];
  subject: string;

  months: Month[];
  month: string;

  years: string[];
  year: string;

  totalLectures: number;
  totalPresent: number;
  totalAbsent: number;
  attendancePercentage: string;

  constructor(
    public dateService: DateService,
    private branchService: BranchService,
    private batchService: BatchService,
    private toastrService: NbToastrService,
    private studentService: StudentService,
    private studentCourseService: StudentCourseService,
    private attendanceService: AttendanceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.studentCourseId = this.studentCourseService.getStudentCourseId();
    this.studentId = this.studentService.getStudentId();

    if (!this.branchId || !this.categoryId || !this.studentCourseId || !this.studentId) {
      this.back();
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

    this.attendance = [];

    this.subjects = [];
    this.subject = '';

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = (this.dateService.getDate().getMonth() + 1).toString().padStart(2, '0');
    this.year = this.years[this.years.length - 1];

    this.totalLectures = 0;
    this.totalPresent = 0;
    this.totalAbsent = 0;
    this.attendancePercentage = '--';

    this.batchService
      .getBatchSubjects(this.studentCourse.course, this.studentCourse.batch)
      .subscribe(
        (subjects: SubjectModel[]) => {
          this.subjects = subjects;
          this.getStudentCourseAttendance();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.back();
        },
      );
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.getStudentCourseAttendance();
  }

  onSelectYear(year: string) {
    this.year = year;
    if (year === '') {
      this.month = '';
    }
    this.getStudentCourseAttendance();
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    this.getStudentCourseAttendance();
  }

  getStudentCourseAttendance() {
    this.loading = true;
    this.attendanceService
      .getStudentCourseAttendance(
        this.subject,
        this.month,
        this.year,
        this.studentId,
        this.studentCourseId,
      )
      .subscribe(
        (attendance: any[]) => {
          this.attendance = attendance;
          this.calculateAttendance(attendance.length);
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.back();
        },
      );
  }

  calculateAttendance(totalLectures: number) {
    let totalPresent = 0;
    let totalAbsent = 0;

    this.attendance.forEach((atten: any) => {
      if (atten.attendance) {
        totalPresent++;
      } else {
        totalAbsent++;
      }
    });

    this.totalLectures = totalLectures;
    this.totalPresent = totalPresent;
    this.totalAbsent = totalAbsent;

    let attendancePercentage: number;

    if (totalLectures > 0) {
      attendancePercentage = (totalPresent * 100) / totalLectures;
    }

    if (attendancePercentage) {
      this.attendancePercentage = attendancePercentage.toFixed(2).toString() + '%';
    } else {
      this.attendancePercentage = '--';
    }
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
