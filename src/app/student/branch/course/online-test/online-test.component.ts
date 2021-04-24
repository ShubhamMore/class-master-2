import { StudentBranchService } from './../../student-branch.service';
import { NbToastrService } from '@nebular/theme';
import { StudentCourseModel } from '../../../../models/student-course.model';
import { StudentCourseService } from './../../../../services/student-course.service';
import { SubjectService } from './../../../../services/subject.service';
import { SubjectModel } from '../../../../models/course.model';
import { CourseService } from './../../../../services/course.service';
import { BatchService } from './../../../../services/batch.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.scss'],
})
export class OnlineTestComponent implements OnInit, OnDestroy {
  loading: boolean;
  private branchId: string;
  studentCourse: StudentCourseModel;

  constructor(
    private branchService: BranchService,
    private studentBranchService: StudentBranchService,
    private studentCourseService: StudentCourseService,
    private courseService: CourseService,
    private batchService: BatchService,
    private subjectService: SubjectService,
    private toastrService: NbToastrService,
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

    this.batchService
      .getBatchSubjects(this.studentCourse.course, this.studentCourse.batch)
      .subscribe(
        (subjects: SubjectModel[]) => {
          this.subjectService.setSubjectsData(subjects);
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.back();
        },
      );
  }

  back() {
    const type = this.studentBranchService.getType();
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: { type } });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.courseService.deleteCourseData();
    this.batchService.deleteBatchData();
    this.subjectService.deleteSubjectsData();
  }
}
