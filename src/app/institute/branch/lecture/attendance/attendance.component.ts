import { DateService } from './../../../../services/shared-services/date.service';
import { NbToastrService } from '@nebular/theme';
import { BatchModel } from '../../../../models/batch.model';
import { CourseModel, SubjectModel } from '../../../../models/course.model';
import { CourseService } from './../../../../services/course.service';
import { BatchService } from './../../../../services/batch.service';
import { LectureService } from './../../../../services/lecture.service';
import { AttendanceService } from './../../../../services/attendance.service';
import { BranchService } from './../../../../services/branch.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleModel as LectureModel } from '../../../../models/schedule.model';

interface StudentAttendance {
  name: string;
  student: string;
  rollNumber: string;
  attendance?: boolean;
}

@Component({
  selector: 'ngx-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  loading: boolean;
  branchId: string;
  course: CourseModel;
  batch: BatchModel;
  lecture: LectureModel;
  students: StudentAttendance[];

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private batchService: BatchService,
    public dateService: DateService,
    private lectureService: LectureService,
    private attendanceService: AttendanceService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.showToastr('top-right', 'danger', 'Branch Not Found');
      this.back();
      return;
    }

    this.lectureService.getLectureData().subscribe((lecture: LectureModel) => {
      this.lecture = lecture;
    });

    if (!this.lecture) {
      this.showToastr('top-right', 'danger', 'Lecture Not Found');
      this.back();
      return;
    }

    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      this.course = course;
    });

    this.batchService.getBatchData().subscribe((batch: BatchModel) => {
      this.batch = batch;
    });

    this.students = [];

    this.getStudents();
  }

  private getStudents() {
    this.loading = true;
    this.attendanceService
      .getStudents(
        this.lecture.branch,
        this.lecture.category,
        this.lecture.course,
        this.lecture.batch,
        this.lecture._id,
      )
      .subscribe(
        (students: StudentAttendance[]) => {
          students.map((student: any) => {
            return (student.attendance = student.attendance ? student.attendance : false);
          });
          this.students = students;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
  }

  onChangeAttendance(attendance: boolean, i: number) {
    this.students[i].attendance = attendance;
  }

  saveAttendance() {
    const attendance = {
      date: this.lecture.date,
      branch: this.lecture.branch,
      category: this.lecture.category,
      course: this.lecture.course,
      batch: this.lecture.batch,
      subject: this.lecture.subject,
      lecture: this.lecture._id,
      attendance: this.students,
    };

    this.attendanceService.saveAttendance(attendance).subscribe(
      (res: any) => {
        this.showToastr(
          'top-right',
          'success',
          `Attendance ${res ? 'Updated' : 'Marked'} Successfully`,
        );
        this.back();
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  getTime(startTime: string, endTime: string) {
    startTime = this.dateService.formatTime(startTime);
    endTime = this.dateService.formatTime(endTime);
    return startTime + ' - ' + endTime;
  }

  getTeacher(teacher: string) {
    return teacher;
  }

  getSubject(subject: string) {
    const mySubject = this.course.subjects.find(
      (curSubject: SubjectModel) => curSubject._id === subject,
    );

    if (!mySubject) {
      return '--';
    }
    return mySubject.subject;
  }

  back() {
    this.router.navigate(['../manage'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
