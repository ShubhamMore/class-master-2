import { OnlineLectureComponent } from './online-lecture/online-lecture.component';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { BatchModel } from '../../../../models/batch.model';
import { CategoryModel } from '../../../../models/branch.model';
import { CourseModel, SubjectModel } from '../../../../models/course.model';
import { CourseService } from './../../../../services/course.service';
import { LectureService } from './../../../../services/lecture.service';
import { ScheduleModel as LectureModel } from '../../../../models/schedule.model';
import { DateService } from './../../../../services/shared-services/date.service';
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from './../../../../services/batch.service';

@Component({
  selector: 'ngx-manage-lecture',
  templateUrl: './manage-lecture.component.html',
  styleUrls: ['./manage-lecture.component.scss'],
})
export class ManageLectureComponent implements OnInit {
  loading: boolean;
  branchId: string;

  category: CategoryModel;
  course: CourseModel;
  batch: BatchModel;

  onlineLectures: LectureModel[];
  classroomLectures: LectureModel[];

  date: string;

  constructor(
    private branchService: BranchService,
    private lectureService: LectureService,
    private courseService: CourseService,
    private batchService: BatchService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
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

    this.date = this.lectureService.getSearchDate();
    if (!this.date) {
      this.date = this.dateService.getDateString();
    }

    this.onlineLectures = [];
    this.classroomLectures = [];

    this.getLecture();
  }

  getTime(startTime: string, endTime: string) {
    startTime = this.dateService.formatTime(startTime);
    endTime = this.dateService.formatTime(endTime);
    return startTime + ' - ' + endTime;
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

  markAttendance(lecture: LectureModel) {
    this.lectureService.setLectureId(lecture._id);
    this.lectureService.setLectureData(lecture);
    this.router.navigate(['../attendance'], {
      relativeTo: this.route,
    });
  }

  startOnlineLecture(lecture: LectureModel) {
    if (lecture.sessionType === 'online') {
      this.lectureService.setLectureId(lecture._id);
      this.windowService.open(OnlineLectureComponent, {
        title: lecture.topic,
        context: {},
      });
    } else {
      this.showToastr('top-right', 'danger', 'This os not an Online Lecture');
    }
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
      .getLectures(this.branchId, this.category._id, this.course._id, this.batch._id, this.date)
      .subscribe(
        (lectures: LectureModel[]) => {
          this.onlineLectures = lectures.filter(
            (lecture: LectureModel) => lecture.sessionType === 'online',
          );
          this.classroomLectures = lectures.filter(
            (lecture: LectureModel) => lecture.sessionType === 'classroom',
          );
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
}
