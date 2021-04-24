import { DateService } from './../../services/shared-services/date.service';
import { StudentCourseService } from './../../services/student-course.service';
import { StudentCourseModel } from '../../models/student-course.model';
import {
  InstallmentModel,
  StudentCourseInstallmentModel,
} from '../../models/student-course-installment.model';
import { StudentCourseInstallmentService } from './../../services/student-course-installment.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CheckoutService } from '../../services/checkout.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'ngx-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  courseInstallment: StudentCourseInstallmentModel;
  installment: InstallmentModel;
  studentCourse: StudentCourseModel;

  constructor(
    public dateService: DateService,
    private studentCourseService: StudentCourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<CheckoutComponent>,
  ) {}

  ngOnInit(): void {
    this.studentCourseService
      .getStudentCourseData()
      .subscribe((studentCourse: StudentCourseModel) => {
        this.studentCourse = studentCourse;
      });

    this.studentCourseInstallmentService
      .getStudentCourseInstallmentData()
      .subscribe((courseInstallment: StudentCourseInstallmentModel) => {
        this.courseInstallment = courseInstallment;
      });

    this.studentCourseInstallmentService
      .getCourseInstallmentData()
      .subscribe((installment: InstallmentModel) => {
        this.installment = installment;
      });

    if (!this.installment && !this.courseInstallment) {
      this.onClose();
    }
  }

  onClose() {
    this.ref.close({ status: false });
  }

  checkout() {
    this.ref.close({ status: true });
  }
}
