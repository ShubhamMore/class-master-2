import { StudentCourseInstallmentService } from './../../../../../../services/student-course-installment.service';
import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../../../services/branch.service';
import { StudentService } from '../../../../../../services/student.service';
import { Location } from '@angular/common';
import { CourseService } from '../../../../../../services/course.service';

@Component({
  selector: 'ngx-manage-student-course-installment',
  templateUrl: './manage-student-course-installment.component.html',
  styleUrls: ['./manage-student-course-installment.component.scss'],
})
export class ManageStudentCourseInstallmentComponent implements OnInit {
  private branchId: string;
  private studentId: string;
  private categoryId: string;

  constructor(
    private branchService: BranchService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,

    private courseService: CourseService,
    private studentService: StudentService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.studentId = this.studentService.getStudentId();

    if (!this.branchId && !this.categoryId && !this.studentId) {
      this.location.back();
      return;
    }
  }
}
