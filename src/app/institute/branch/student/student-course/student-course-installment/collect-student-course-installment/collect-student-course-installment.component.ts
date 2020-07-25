import { StudentCourseInstallmentService } from './../../../../../../services/student-course-installment.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentCourseInstallmentReceiptModel } from './../../../../../../models/student-course-installment-receipt.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CourseService } from './../../../../../../services/course.service';
import { DateService } from './../../../../../../services/shared-services/date.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstallmentModel } from './../../../../../../models/student-course-installment.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BranchService } from '../../../../../../services/branch.service';
import { StudentService } from '../../../../../../services/student.service';

import { StudentCourseInstallmentReceiptService } from '../../../../../../services/student-course-installment-receipt.service';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-collect-student-course-installment',
  templateUrl: './collect-student-course-installment.component.html',
  styleUrls: ['./collect-student-course-installment.component.scss'],
})
export class CollectStudentCourseInstallmentComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  private branchId: string;
  private categoryId: string;
  courseId: string;
  private studentId: string;

  private courseInstallmentId: string;

  courseInstallment: InstallmentModel;
  private studentCourseInstallmentId: string;
  private studentCourseInstallmentReceiptId: string;
  private studentCourseInstallmentReceipt: StudentCourseInstallmentReceiptModel;
  courseInstallmentReceiptForm: FormGroup;
  loading: boolean;

  constructor(
    public dateService: DateService,
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private studentService: StudentService,
    private courseService: CourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
    private studentCourseInstallmentReceiptService: StudentCourseInstallmentReceiptService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.courseId = this.courseService.getCourseId();
    this.studentId = this.studentService.getStudentId();
    this.courseInstallmentId = this.studentCourseInstallmentService.getCourseInstallmentId();

    if (!this.branchId || !this.categoryId || !this.courseId || !this.studentId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.studentCourseInstallmentId = this.studentCourseInstallmentService.getStudentCourseInstallmentId();

    this.courseInstallmentReceiptForm = new FormGroup({
      generatedBy: new FormControl(null, { validators: [Validators.required] }),
      date: new FormControl(null, { validators: [Validators.required] }),
      amount: new FormControl(null, { validators: [Validators.min(0)] }),
      lateFee: new FormControl(0, { validators: [Validators.min(0)] }),
      totalAmount: new FormControl(null, { validators: [Validators.required, Validators.min(0)] }),
      paymentDate: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      paymentMode: new FormControl('', { validators: [Validators.required] }),
      bankDetails: new FormControl(null, { validators: [] }),
      transactionDetails: new FormControl(null, { validators: [] }),
      description: new FormControl(null, { validators: [] }),
      amountDue: new FormControl(null, { validators: [Validators.required, Validators.min(0)] }),
    });

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    // tslint:disable-next-line: max-line-length
    this.studentCourseInstallmentReceiptId = this.studentCourseInstallmentReceiptService.getStudentCourseInstallmentReceiptId();

    if (mode && !this.studentCourseInstallmentReceiptId) {
      this.showToastr('top-right', 'danger', 'Receipt Id Not Provided');
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    if (this.studentCourseInstallmentReceiptId) {
      this.studentCourseInstallmentReceiptService
        .getStudentCourseInstallmentReceiptForEditing(this.studentCourseInstallmentReceiptId)
        .subscribe(
          (studentCourseInstallmentReceipt: StudentCourseInstallmentReceiptModel) => {
            if (!studentCourseInstallmentReceipt) {
              this.showToastr('top-right', 'danger', 'Receipt Not Available');
              this.router.navigate(['../'], { relativeTo: this.route });

              return;
            }
            this.studentCourseInstallmentReceipt = studentCourseInstallmentReceipt;

            this.courseInstallmentReceiptForm.patchValue({
              generatedBy: this.studentCourseInstallmentReceipt.generatedBy,
              date: this.studentCourseInstallmentReceipt.date,
              amount: this.studentCourseInstallmentReceipt.amount,
              lateFee: this.studentCourseInstallmentReceipt.lateFee,
              totalAmount: this.studentCourseInstallmentReceipt.totalAmount,
              paymentDate: this.studentCourseInstallmentReceipt.paymentDate,
              paymentMode: this.studentCourseInstallmentReceipt.paymentMode,
              bankDetails: this.studentCourseInstallmentReceipt.bankDetails,
              transactionDetails: this.studentCourseInstallmentReceipt.transactionDetails,
              description: this.studentCourseInstallmentReceipt.description,
              amountDue: this.studentCourseInstallmentReceipt.amountDue,
            });

            this.loading = false;
          },
          (err: any) => {
            this.showToastr('top-right', 'danger', 'Receipt Not Available');
            this.router.navigate(['../'], { relativeTo: this.route });
          },
        );
    } else {
      this.studentCourseInstallmentService
        .getCourseInstallment(this.courseInstallmentId)
        .subscribe((courseInstallment: InstallmentModel) => {
          if (!courseInstallment) {
            this.router.navigate(['../'], { relativeTo: this.route });

            return;
          }

          this.courseInstallment = courseInstallment;

          this.courseInstallmentReceiptForm.patchValue({
            date: courseInstallment.installmentDate,
            amount: courseInstallment.installmentAmount,
            amountDue: courseInstallment.amountPending,
          });

          this.calculateTotalAmount();

          this.loading = false;
        });
    }
  }

  calculateTotalAmount() {
    let lateFee = +this.courseInstallmentReceiptForm.getRawValue().lateFee;
    if (!lateFee || lateFee < 0) {
      lateFee = 0;
    }
    const amount = +this.courseInstallmentReceiptForm.getRawValue().amount;

    const totalAmount = amount + lateFee;

    this.courseInstallmentReceiptForm.patchValue({ totalAmount });
  }

  previousStep() {
    this.stepper.previous();
  }

  courseInstallmentReceiptFormSubmit() {
    this.courseInstallmentReceiptForm.markAllAsTouched();
    if (this.courseInstallmentReceiptForm.invalid) {
      this.showToastr('top-right', 'danger', 'Receipt Details are Required');
      return;
    }
    this.stepper.next();
  }

  saveCourseInstallmentReceipt() {
    if (this.courseInstallmentReceiptForm.invalid) {
      this.showToastr('top-right', 'danger', 'Receipt Details are Required');
      return;
    }

    this.loading = true;

    const receiptDetails: any = this.courseInstallmentReceiptForm.getRawValue();
    receiptDetails.studentCourseInstallmentId = this.studentCourseInstallmentId;
    receiptDetails.courseInstallmentId = this.courseInstallmentId;
    receiptDetails.branch = this.branchId;
    receiptDetails.category = this.categoryId;
    receiptDetails.course = this.courseId;
    receiptDetails.student = this.studentId;

    if (!this.studentCourseInstallmentReceipt) {
      this.studentCourseInstallmentReceiptService
        .addStudentCourseInstallmentReceipt(receiptDetails)
        .subscribe(
          (res: { receiptId: string }) => {
            this.showToastr('top-right', 'success', 'Installment Receipt Generated Successfully!');
            this.studentCourseInstallmentService.setCourseInstallmentReceipt(
              this.courseInstallmentId,
              res.receiptId,
            );
            this.back();
          },
          (err: any) => {
            this.showToastr('top-right', 'danger', err);
            this.loading = false;
          },
        );
    } else {
      receiptDetails._id = this.studentCourseInstallmentReceipt._id;
      this.studentCourseInstallmentReceiptService
        .editStudentCourseInstallmentReceipt(receiptDetails)
        .subscribe(
          (res: any) => {
            this.showToastr('top-right', 'success', 'Installment Receipt Updated Successfully!');
            this.back();
          },
          (err: any) => {
            this.showToastr('top-right', 'danger', err);
            this.loading = false;
          },
        );
    }
  }

  getCourseName(courseId: string): Observable<string> {
    return this.courseService.getCourseName(courseId).pipe(
      map((courseName: string) => {
        return courseName;
      }),
    );
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.studentCourseInstallmentReceiptService.deleteStudentCourseInstallmentReceiptId();
    this.studentCourseInstallmentService.deleteCourseInstallmentId();
  }
}
