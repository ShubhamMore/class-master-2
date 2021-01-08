import { StudentBranchService } from './../../student-branch.service';
import { StudentCourseService } from './../../../../services/student-course.service';
import { CourseService } from './../../../../services/course.service';
import { StudentCourseInstallmentService } from './../../../../services/student-course-installment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-course-installment',
  templateUrl: './course-installment.component.html',
  styleUrls: ['./course-installment.component.scss'],
})
export class CourseInstallmentComponent implements OnInit, OnDestroy {
  private branchId: string;
  loading: boolean;

  constructor(
    private branchService: BranchService,
    private studentBranchService: StudentBranchService,
    private courseService: CourseService,
    private studentCourseService: StudentCourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
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

    this.loading = false;
  }

  ngOnDestroy() {
    this.courseService.deleteCourseId();
    this.studentCourseService.deleteStudentCourseData();
    this.studentCourseInstallmentService.deleteStudentCourseInstallmentId();
    this.studentCourseInstallmentService.deleteStudentCourseInstallmentData();
  }
}
