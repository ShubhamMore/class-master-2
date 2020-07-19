import { StudentService } from './../../../../services/student.service';
import { BranchService } from './../../../../services/branch.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.scss'],
})
export class StudentCourseComponent implements OnInit, OnDestroy {
  private branchId: string;
  private studentId: string;
  private categoryId: string;

  constructor(
    private branchService: BranchService,
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

  ngOnDestroy() {
    this.branchService.deleteBranchId();
    this.branchService.deleteCategoryId();
    this.studentService.deleteStudentId();
  }
}
