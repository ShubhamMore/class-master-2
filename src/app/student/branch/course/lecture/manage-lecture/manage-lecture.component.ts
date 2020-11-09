import { StudentBranchService } from './../../../student-branch.service';
import { StudentCourseService } from './../../../../../services/student-course.service';
import { StudentCourseModel } from './../../../../../models/student-course.model';
import { NbToastrService } from '@nebular/theme';
import { LectureService } from './../../../../../services/lecture.service';
import { ScheduleModel as LectureModel } from './../../../../../models/schedule.model';
import { DateService } from './../../../../../services/shared-services/date.service';
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-manage-lecture',
  templateUrl: './manage-lecture.component.html',
  styleUrls: ['./manage-lecture.component.scss'],
})
export class ManageLectureComponent implements OnInit {
  loading: boolean;
  branchId: string;

  lectures: LectureModel[];
  studentCourse: StudentCourseModel;
  date: string;

  constructor(
    private branchService: BranchService,
    private lectureService: LectureService,
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

    this.date = this.lectureService.getSearchDate();
    if (!this.date) {
      this.date = this.dateService.getDateString();
    }

    this.lectures = [];

    this.studentCourseService
      .getStudentCourseData()
      .subscribe((studentCourse: StudentCourseModel) => {
        this.studentCourse = studentCourse;
        if (studentCourse) {
          this.getLecture();
        } else {
          this.back();
        }
      });
  }

  getTime(startTime: string, endTime: string) {
    startTime = this.dateService.formatTime(startTime);
    endTime = this.dateService.formatTime(endTime);
    return startTime + ' - ' + endTime;
  }

  lectureMaterial(lecture: LectureModel) {
    this.lectureService.setLectureId(lecture._id);
    this.lectureService.setLectureData(lecture);
    this.router.navigate(['../material'], {
      relativeTo: this.route,
    });
  }

  questionAnswers(lecture: LectureModel) {
    this.lectureService.setLectureId(lecture._id);
    this.lectureService.setLectureData(lecture);
    this.router.navigate(['../q&a'], {
      relativeTo: this.route,
    });
  }

  getLecture() {
    this.loading = true;

    this.lectureService
      .getLecturesForStudent(
        this.branchId,
        this.studentCourse.category,
        this.studentCourse.course,
        this.studentCourse.batch,
        this.date,
      )
      .subscribe(
        (lectures: LectureModel[]) => {
          this.lectures = lectures;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
  }

  dateChanged() {
    if (this.date) {
      this.lectureService.setSearchDate(this.date);
      this.getLecture();
    }
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    const type = this.studentBranchService.getType();
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: { type } });
  }
}
