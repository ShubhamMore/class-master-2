import { NbToastrService } from '@nebular/theme';
import { BatchModel } from './../../../../models/batch.model';
import { CourseModel } from './../../../../models/course.model';
import { BatchService } from './../../../../services/batch.service';
import { CourseService } from './../../../../services/course.service';
import { DiscountAndOfferModel } from './../../../../models/discount-and-offer.model';
import { DiscountAndOfferService } from './../../../../services/discount-and-offer.service';
import { StudentModel } from './../../../../models/student.model';
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
    private toastrService: NbToastrService,
    private courseService: CourseService,
    private batchService: BatchService,
    private studentService: StudentService,
    private discountAndOfferService: DiscountAndOfferService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.studentId = this.studentService.getStudentId();

    if (!this.branchId && !this.categoryId && !this.studentId) {
      this.location.back();
      this.showToastr('top-right', 'danger', 'Student Details Not Available');
      return;
    }

    this.studentService.getStudentByImsId(this.studentId).subscribe(
      (student: StudentModel) => {
        this.studentService.setStudentData(student);
      },
      (err: any) => {
        this.studentService.setStudentData(null);
        this.showToastr('top-right', 'danger', err);
        this.location.back();
      },
    );

    this.courseService.getCourses(this.branchId, this.categoryId).subscribe(
      (courses: CourseModel[]) => {
        this.courseService.setCoursesData(courses);
      },
      (err: any) => {
        this.courseService.setCoursesData(null);
        this.showToastr('top-right', 'danger', err);
        this.location.back();
      },
    );

    this.batchService.getBatches(this.branchId, this.categoryId, '').subscribe(
      (batches: BatchModel[]) => {
        this.batchService.setBatchesData(batches);
      },
      (err: any) => {
        this.batchService.setBatchesData(null);
        this.showToastr('top-right', 'danger', err);
        this.location.back();
      },
    );

    this.discountAndOfferService.getDiscountAndOffers(this.branchId).subscribe(
      (discountAndOffers: DiscountAndOfferModel[]) => {
        this.discountAndOfferService.setDiscountAndOffersData(discountAndOffers);
      },
      (err: any) => {
        this.discountAndOfferService.setDiscountAndOffersData(null);
        this.showToastr('top-right', 'danger', err);
        this.location.back();
      },
    );
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.branchService.deleteCategoryId();
    this.studentService.deleteStudentId();
    this.studentService.deleteStudentData();
    this.courseService.deleteCoursesData();
    this.batchService.deleteBatchesData();
    this.discountAndOfferService.deleteDiscountAndOffersData();
  }
}
