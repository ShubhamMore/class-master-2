import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../../services/branch.service';
import { StudentService } from '../../../../../services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-add-student-course',
  templateUrl: './add-student-course.component.html',
  styleUrls: ['./add-student-course.component.scss'],
})
export class AddStudentCourseComponent implements OnInit {
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
}
