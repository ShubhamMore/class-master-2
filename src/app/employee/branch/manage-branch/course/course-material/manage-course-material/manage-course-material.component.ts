import { CourseMaterialModel } from './../../../../../../models/course-material.model';
import { Component, OnInit } from '@angular/core';
import { CourseModel, SubjectModel } from './../../../../../../models/course.model';
import { CourseService } from './../../../../../../services/course.service';
import { CourseMaterialService } from './../../../../../../services/course-material.service';
import { BranchService } from './../../../../../../services/branch.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-manage-course-material',
  templateUrl: './manage-course-material.component.html',
  styleUrls: ['./manage-course-material.component.scss'],
})
export class ManageCourseMaterialComponent implements OnInit {
  loading: boolean;
  branchId: string;
  course: CourseModel;
  subject: string;
  courseMaterials: CourseMaterialModel[];

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private courseMaterialService: CourseMaterialService,
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
    this.courseMaterials = [];
    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      this.course = course;
      if (!this.course) {
        this.router.navigate(['../'], { relativeTo: this.route });
        return;
      }
      this.getCourseMaterials(this.subject);
    });
  }

  getCourseMaterials(subject: string) {
    this.loading = true;
    this.subject = subject;
    this.courseMaterialService
      .getCourseMaterials(
        this.branchId,
        this.course.basicDetails.category,
        this.course._id,
        subject,
      )
      .subscribe(
        (courseMaterials: CourseMaterialModel[]) => {
          this.courseMaterials = courseMaterials;
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
        },
      );
  }

  addCourseMaterial() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  deleteCourseMaterial(id: string, i: number) {
    this.loading = true;
    this.courseMaterialService.deleteCourseMaterial(id).subscribe(
      (res: any) => {
        this.courseMaterials.splice(i, 1);
        this.showToastr('top-right', 'success', `CourseMaterial Deleted Successfully!`);
        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  viewCourseMaterial(courseMaterial: CourseMaterialModel) {
    this.courseMaterialService.setCourseMaterialId(courseMaterial._id);
    this.courseMaterialService.setCourseMaterialData(courseMaterial);
    this.router.navigate(['../view'], { relativeTo: this.route });
  }

  getSubject(subjectId: string) {
    const subject = this.course.subjects.find(
      (curSubject: SubjectModel) => curSubject._id === subjectId,
    );

    if (subject) {
      return subject.subject;
    }

    return '--';
  }

  changeCourseMaterialStatus(id: string, status: boolean, i: number) {
    this.loading = true;
    this.courseMaterialService.changeCourseMaterialStatus(id, status).subscribe(
      (res: any) => {
        this.courseMaterials[i].status = status;
        this.showToastr(
          'top-right',
          'success',
          `CourseMaterial ${status ? 'Activated' : 'Deactivated'} Successfully!`,
        );
        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
