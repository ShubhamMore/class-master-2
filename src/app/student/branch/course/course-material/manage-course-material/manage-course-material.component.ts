import { CourseMaterialModel } from './../../../../../models/course-material.model';
import { StudentBranchService } from './../../../student-branch.service';
import { CourseMaterialService } from './../../../../../services/course-material.service';
import { BatchService } from './../../../../../services/batch.service';
import { StudentCourseModel } from './../../../../../models/student-course.model';
import { SubjectModel } from './../../../../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentCourseService } from './../../../../../services/student-course.service';
import { NbToastrService } from '@nebular/theme';
import { BranchService } from './../../../../../services/branch.service';
import { DateService, Month } from './../../../../../services/shared-services/date.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ngx-manage-course-material',
  templateUrl: './manage-course-material.component.html',
  styleUrls: ['./manage-course-material.component.scss'],
})
export class ManageCourseMaterialComponent implements OnInit {
  private branchId: string;

  private studentCourse: StudentCourseModel;

  loading: boolean;

  courseMaterials: CourseMaterialModel[];

  subjects: SubjectModel[];
  subject: string;

  constructor(
    public dateService: DateService,
    private studentBranchService: StudentBranchService,
    private branchService: BranchService,
    private batchService: BatchService,
    private toastrService: NbToastrService,
    private studentCourseService: StudentCourseService,
    private courseMaterialService: CourseMaterialService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();

    if (!this.branchId) {
      this.back();
      return;
    }

    this.studentBranchService.setType('course');
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

    this.courseMaterials = [];

    this.subjects = [];
    this.subject = '';

    this.batchService
      .getBatchSubjects(this.studentCourse.course, this.studentCourse.batch)
      .subscribe(
        (subjects: SubjectModel[]) => {
          this.subjects = subjects;
          this.getStudentCourseMaterial();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.back();
        },
      );
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    this.getStudentCourseMaterial();
  }

  getStudentCourseMaterial() {
    this.loading = true;
    this.courseMaterialService
      .getCourseMaterialsForStudent(
        this.branchId,
        this.studentCourse.category,
        this.studentCourse.course,
        this.subject,
      )
      .subscribe(
        (courseMaterials: CourseMaterialModel[]) => {
          this.courseMaterials = courseMaterials;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.back();
        },
      );
  }

  viewCourseMaterial(courseMaterial: CourseMaterialModel) {
    this.courseMaterialService.setCourseMaterialId(courseMaterial._id);
    this.courseMaterialService.setCourseMaterialData(courseMaterial);
    this.router.navigate(['../view'], { relativeTo: this.route });
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
    this.router.navigate(['../../'], { relativeTo: this.route, queryParams: { type } });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
