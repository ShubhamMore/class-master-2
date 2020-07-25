import { NbToastrService } from '@nebular/theme';
import { StudentCourseInstallmentReceiptService } from './../../../../../../services/student-course-installment-receipt.service';
import { InstituteBillingModel } from './../../../../../../models/institute-billing.model';
import { StudentCourseInstallmentReceiptModel } from './../../../../../../models/student-course-installment-receipt.model';
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

  loading: boolean;

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
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.studentCourseInstallmentReceiptService
      .getStudentCourseInstallmentReceipt(this.studentCourseInstallmentReceiptId)
      .subscribe(
        (res: {
          studentCourseInstallmentReceipt: StudentCourseInstallmentReceiptModel;
          instituteBilling: InstituteBillingModel;
        }) => {
          this.studentCourseInstallmentReceipt = res.studentCourseInstallmentReceipt;
          this.instituteBilling = res.instituteBilling;
          this.loading = false;
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.router.navigate(['../'], { relativeTo: this.route });

          return;
        },
      );
  }

  print() {
    window.print();
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.studentCourseInstallmentReceiptService.deleteStudentCourseInstallmentReceiptId();
  }
}
