import { CourseModel } from '../../../../../../models/course.model';
import { NbToastrService } from '@nebular/theme';
import { StudentCourseInstallmentReceiptService } from './../../../../../../services/student-course-installment-receipt.service';
import { InstituteBillingModel } from '../../../../../../models/institute-billing.model';
import { StudentCourseInstallmentReceiptModel } from '../../../../../../models/student-course-installment-receipt.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from '../../../../../../services/branch.service';
import { StudentService } from '../../../../../../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-student-course-installment-receipt',
  templateUrl: './student-course-installment-receipt.component.html',
  styleUrls: ['./student-course-installment-receipt.component.scss'],
})
export class StudentCourseInstallmentReceiptComponent implements OnInit, OnDestroy {
  private branchId: string;
  private studentId: string;
  private categoryId: string;
  private studentCourseInstallmentReceiptId: string;
  studentCourseInstallmentReceipt: StudentCourseInstallmentReceiptModel;
  instituteBilling: InstituteBillingModel;
  course: CourseModel;

  loading: boolean;

  amount: string;
  gstAmount: string;
  lateFee: string;
  totalAmount: string;

  constructor(
    private branchService: BranchService,
    private studentService: StudentService,
    public toastrService: NbToastrService,
    private studentCourseInstallmentReceiptService: StudentCourseInstallmentReceiptService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.studentId = this.studentService.getStudentId();
    // tslint:disable-next-line: max-line-length
    this.studentCourseInstallmentReceiptId = this.studentCourseInstallmentReceiptService.getStudentCourseInstallmentReceiptId();

    if (
      !this.branchId ||
      !this.categoryId ||
      !this.studentId ||
      !this.studentCourseInstallmentReceiptId
    ) {
      this.showToastr('top-right', 'danger', 'Invalid Receipt');
      this.back();

      return;
    }

    this.studentCourseInstallmentReceiptService
      .getStudentCourseInstallmentReceipt(this.studentCourseInstallmentReceiptId)
      .subscribe(
        (res: {
          studentCourseInstallmentReceipt: StudentCourseInstallmentReceiptModel;
          instituteBilling: InstituteBillingModel;
          course: CourseModel;
        }) => {
          this.studentCourseInstallmentReceipt = res.studentCourseInstallmentReceipt;
          this.instituteBilling = res.instituteBilling;
          this.course = res.course;

          if (!res.instituteBilling.gstNumber) {
            this.amount = res.studentCourseInstallmentReceipt.amount.toFixed(2);
          } else {
            const courseAmount = +res.studentCourseInstallmentReceipt.amount;
            const gstPercentage = +res.course.feeDetails.gst;

            const amount = courseAmount / (1 + gstPercentage / 100);
            const gstAmount = courseAmount - amount;

            this.gstAmount = gstAmount.toFixed(2);
            this.amount = amount.toFixed(2);
          }
          this.lateFee = res.studentCourseInstallmentReceipt.lateFee.toFixed(2);
          this.totalAmount = res.studentCourseInstallmentReceipt.totalAmount.toFixed(2);

          this.loading = false;
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.back();

          return;
        },
      );
  }

  print() {
    window.print();
  }

  getAmount(amount: any) {
    amount = +amount;
    return amount.toFixed(2).toString() + '/-';
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.studentCourseInstallmentReceiptService.deleteStudentCourseInstallmentReceiptId();
  }
}
