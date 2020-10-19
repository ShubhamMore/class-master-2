import { BatchModel } from './../../../../../../models/batch.model';
import { CourseModel } from './../../../../../../models/course.model';
import { LectureMaterialModel } from './../../../../../../models/lecture-material.model';
import { Component, OnInit } from '@angular/core';
import { ScheduleModel as LectureModel } from './../../../../../../models/schedule.model';
import { LectureService } from './../../../../../../services/lecture.service';
import { LectureMaterialService } from './../../../../../../services/lecture-material.service';
import { BranchService } from './../../../../../../services/branch.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-manage-study-material',
  templateUrl: './manage-study-material.component.html',
  styleUrls: ['./manage-study-material.component.scss'],
})
export class ManageStudyMaterialComponent implements OnInit {
  loading: boolean;
  branchId: string;
  course: CourseModel;
  batch: BatchModel;
  lecture: LectureModel;
  subject: string;
  lectureMaterials: LectureMaterialModel[];

  constructor(
    private branchService: BranchService,
    private lectureService: LectureService,
    private lectureMaterialService: LectureMaterialService,
    private toastrService: NbToastrService,
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
    this.subject = '';
    this.lectureMaterials = [];
    this.lectureService.getLectureData().subscribe((lecture: LectureModel) => {
      this.lecture = lecture;
      if (!this.lecture) {
        this.router.navigate(['../'], { relativeTo: this.route });
        return;
      }
      this.getLectureMaterials(this.subject);
    });
  }

  getLectureMaterials(subject: string) {
    this.loading = true;
    this.subject = subject;
    this.lectureMaterialService
      .getLectureMaterialsForStudent(
        this.branchId,
        this.lecture.category,
        this.lecture.course,
        this.lecture.batch,
        this.lecture._id,
      )
      .subscribe(
        (lectureMaterials: LectureMaterialModel[]) => {
          this.lectureMaterials = lectureMaterials;
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
        },
      );
  }
  viewLectureMaterial(lectureMaterial: LectureMaterialModel) {
    this.lectureMaterialService.setLectureMaterialId(lectureMaterial._id);
    this.lectureMaterialService.setLectureMaterialData(lectureMaterial);
    this.router.navigate(['../view'], { relativeTo: this.route });
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
