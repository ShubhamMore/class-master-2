import { Router, ActivatedRoute } from '@angular/router';
import { StudentCourseModel } from './../../../../../models/student-course.model';
import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../../services/branch.service';
import { StudentService } from '../../../../../services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-manage-student-course',
  templateUrl: './manage-student-course.component.html',
  styleUrls: ['./manage-student-course.component.scss'],
})
export class ManageStudentCourseComponent implements OnInit {
  private branchId: string;
  private studentId: string;
  private categoryId: string;

  loading: boolean;

  studentCourses: StudentCourseModel[];

  constructor(
    private branchService: BranchService,
    private studentService: StudentService,
    private studentCourseService: StudentService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.studentId = this.studentService.getStudentId();

    if (!this.branchId && !this.categoryId && !this.studentId) {
      this.location.back();
      return;
    }
    this.studentCourses = [];
  }

  getStudentCourses() {}

  addStudentCourse() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }
}
