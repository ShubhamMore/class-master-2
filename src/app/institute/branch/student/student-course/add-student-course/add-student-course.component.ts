import { CourseService } from './../../../../../services/course.service';
import { BatchService } from './../../../../../services/batch.service';
import { DiscountAndOfferModel } from './../../../../../models/discount-and-offer.model';
import { BatchModel } from './../../../../../models/batch.model';
import { CourseModel } from './../../../../../models/course.model';
import { StudentCourseModel } from './../../../../../models/student-course.model';
import { StudentCourseService } from './../../../../../services/student-course.service';
import { DateService } from './../../../../../services/shared-services/date.service';
import { StudentService } from './../../../../../services/student.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../../services/branch.service';
import { Location } from '@angular/common';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { StudentCourseInstallmentService } from '../../../../../services/student-course-installment.service';
import { StudentCourseInstallmentModel } from '../../../../../models/student-course-installment.model';
import { ObjectId } from 'bson';
import { DiscountAndOfferService } from '../../../../../services/discount-and-offer.service';

@Component({
  selector: 'ngx-add-student-course',
  templateUrl: './add-student-course.component.html',
  styleUrls: ['./add-student-course.component.scss'],
})
export class AddStudentCourseComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  private branchId: string;
  private studentId: string;
  private categoryId: string;
  private studentCourseId: string;

  studentCourse: StudentCourseModel;
  studentCourseInstallment: StudentCourseInstallmentModel;

  discount: DiscountAndOfferModel;
  discounts: DiscountAndOfferModel[];

  discountTypes: string[];

  course: CourseModel;
  courses: CourseModel[];

  batch: BatchModel;
  private batches: BatchModel[];
  courseBatches: BatchModel[];

  rollNumberAlreadyExist: boolean;

  studentCourseForm: FormGroup;
  studentCourseFeeForm: FormGroup;
  studentCourseInstallmentForm: FormGroup;

  constructor(
    public dateService: DateService,
    private toastrService: NbToastrService,
    private branchService: BranchService,
    private courseService: CourseService,
    private batchService: BatchService,
    private discountAndOfferService: DiscountAndOfferService,
    private studentService: StudentService,
    private studentCourseService: StudentCourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    route.queryParams.subscribe((param: Params) => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.studentId = this.studentService.getStudentId();
    if (!this.branchId && !this.categoryId && !this.studentId) {
      this.location.back();
      return;
    }

    this.studentCourseId = this.studentCourseService.getStudentCourseId();

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.studentCourseId) {
      this.showToastr('top-right', 'danger', 'Student Course Not Found');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.discounts = [];
    this.courses = [];
    this.batches = [];
    this.courseBatches = [];
    this.discountTypes = [];
    this.rollNumberAlreadyExist = false;

    this.courseService.getCoursesData().subscribe((courses: CourseModel[]) => {
      this.courses = courses;
    });

    this.batchService.getBatchesData().subscribe((batches: BatchModel[]) => {
      this.batches = batches;
    });

    this.discountAndOfferService
      .getDiscountAndOffersData()
      .subscribe((discountAndOffers: DiscountAndOfferModel[]) => {
        this.discounts = discountAndOffers;
      });

    this.discountTypes = this.discountAndOfferService.getDiscountTypes();

    this.studentCourseForm = new FormGroup(
      {
        course: new FormControl('', { validators: [Validators.required] }),
        batch: new FormControl('', { validators: [Validators.required] }),
        rollNumber: new FormControl(null, { validators: [Validators.required, Validators.min(1)] }),
        discount: new FormControl('', {
          validators: [],
        }),
        additionalDiscountType: new FormControl(
          this.discountTypes.length > 0 ? this.discountTypes[0] : '',
          {
            validators: [],
          },
        ),
        additionalDiscountAmount: new FormControl(0, {
          validators: [Validators.min(0)],
        }),
        activationDate: new FormControl(this.dateService.getDateString(), {
          validators: [Validators.required],
        }),
        netPayable: new FormControl(0, {
          validators: [Validators.required],
        }),
      },
      {
        validators: this.discountPercentageValidator.bind(this),
      },
    );

    this.studentCourseFeeForm = new FormGroup({
      installmentType: new FormControl('0', {
        validators: [Validators.required],
      }),
      date: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      noOfInstallments: new FormControl(1, {
        validators: [Validators.required, Validators.min(1)],
      }),
      pendingAmount: new FormControl(0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      amountCollected: new FormControl(0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalAmount: new FormControl(0, {
        validators: [Validators.required, Validators.min(0)],
      }),
    });

    this.studentCourseInstallmentForm = new FormGroup({
      installments: new FormArray([]),
    });

    if (mode && this.studentId && this.studentCourseId) {
      this.studentCourseService.getStudentCourseForEditing(this.studentCourseId).subscribe(
        (res: any) => {
          this.studentCourse = res.studentCourse;
          this.studentCourseInstallment = res.StudentCourseInstallmentComponent;

          this.studentCourseForm.patchValue({
            course: this.studentCourse.course,
            activationDate: this.studentCourse.activationDate,
            rollNumber: this.studentCourse.activationDate,
            discount: this.studentCourse.discount,
            additionalDiscountType: this.studentCourse.additionalDiscountType,
            additionalDiscountAmount: this.studentCourse.additionalDiscountAmount,
            netPayable: this.studentCourse.netPayable,
          });

          this.onSelectCourse(this.studentCourse.course);

          this.studentCourseForm.patchValue({
            batch: this.studentCourse.batch,
          });

          this.disableStudentCourseDetails();

          this.studentCourseFeeForm.patchValue({
            installmentType: this.studentCourseInstallment.installmentType,
            date: this.studentCourseInstallment.date,
            noOfInstallments: this.studentCourseInstallment.noOfInstallments,
            amountCollected: this.studentCourseInstallment.amountCollected,
            pendingAmount: this.studentCourseInstallment.pendingAmount,
            totalAmount: this.studentCourseInstallment.totalAmount,
          });

          this.loading = false;
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.back();
        },
      );
    } else {
      this.loading = false;
    }
  }

  discountPercentageValidator(group: FormGroup): { [s: string]: boolean } {
    const discountType = group.value.additionalDiscountType;
    const amount = +group.value.additionalDiscountAmount;
    if (discountType === 'percentage' && amount > 100) {
      return { invalidDiscountPercentage: true };
    }
    return null;
  }

  checkRollNumber() {}

  onSelectCourse(courseId: string) {
    this.courseBatches = this.batches.filter(
      (curBatch: BatchModel) => curBatch.course === courseId,
    );
    this.course = this.courses.find((curCourse: CourseModel) => curCourse._id === courseId);
    this.calculateNetPayableAmount();
  }

  onSelectBatch(batchId: string) {
    this.batch = this.batches.find((curBatch: BatchModel) => curBatch._id === batchId);
  }

  onSelectDiscount(discountId: string) {
    this.discount = this.discounts.find((curDicount: any) => curDicount._id === discountId);
    this.calculateNetPayableAmount();
  }

  onAdditionalDiscountAmount(amount: number) {
    if (amount >= 0) {
      this.calculateNetPayableAmount();
    }
  }

  changeAdditionalDiscountType() {
    this.studentCourseForm.patchValue({ additionalDiscount: 0 });
    this.calculateNetPayableAmount();
  }

  private calculateNetPayableAmount() {
    let netPayable = 0;
    let totalDiscountPercentage = 0;
    let totalDiscountAmount = 0;
    let calculatedAmount = 0;

    const totalFee = this.course ? +this.course.feeDetails.totalFees : 0;
    const discountType = this.discount ? this.discount.discountType : '';
    const additionalDiscountType = this.studentCourseForm.value.additionalDiscountType;
    const discount = this.discount ? +this.discount.discountAmount : 0;
    const additionalDiscount = +this.studentCourseForm.value.additionalDiscountAmount;

    if (this.course && totalFee) {
      calculatedAmount = totalFee;

      if (this.discount && discountType) {
        if (discountType === 'percentage') {
          totalDiscountPercentage += discount;
        } else {
          totalDiscountAmount += discount;
        }
      }

      if (additionalDiscount) {
        if (additionalDiscountType === 'percentage') {
          totalDiscountPercentage += additionalDiscount;
        } else {
          totalDiscountAmount += additionalDiscount;
        }
      }
      const percentageAmount = (totalDiscountPercentage / 100) * totalFee;
      calculatedAmount = totalFee - totalDiscountAmount - percentageAmount;

      netPayable = calculatedAmount;

      this.studentCourseForm.patchValue({ netPayable });
      this.studentCourseFeeForm.patchValue({ totalAmount: netPayable });

      this.calculatePendingAmount();

      const installmentType = this.studentCourseFeeForm.value.installmentType;
      this.onSelectInstallmentType(installmentType);
    }
  }

  private calculatePendingAmount() {
    let pendingAmount = 0;
    const totalAmount = this.studentCourseFeeForm.value.totalAmount;
    const amountCollected = this.studentCourseFeeForm.value.amountCollected;
    pendingAmount = +totalAmount - (amountCollected ? amountCollected : 0);
    this.studentCourseFeeForm.patchValue({ pendingAmount });
  }

  private enableStudentCourseDetails() {
    this.studentCourseForm.get('course').enable();
    this.studentCourseForm.get('discount').enable();
    this.studentCourseForm.get('additionalDiscountType').enable();
    this.studentCourseForm.get('additionalDiscountAmount').enable();
  }

  private disableStudentCourseDetails() {
    this.studentCourseForm.get('course').disable();
    this.studentCourseForm.get('discount').disable();
    this.studentCourseForm.get('additionalDiscountType').disable();
    this.studentCourseForm.get('additionalDiscountAmount').disable();
  }

  private getStudentCourseInstallments(): FormGroup[] {
    const installments = this.studentCourseInstallmentForm.get('installments') as FormArray;
    return installments.controls as FormGroup[];
  }

  private resetStudentCourseInstallments() {
    const installments = this.studentCourseInstallmentForm.get('installments') as FormArray;
    installments.controls = [];
  }

  private newStudentCourseInstallment(studentCourseInstallment: any) {
    return new FormGroup({
      _id: new FormControl(
        studentCourseInstallment._id ? studentCourseInstallment._id : new ObjectId().toString(),
        {
          validators: [Validators.required],
        },
      ),
      installmentNo: new FormControl(
        studentCourseInstallment.installmentNo ? studentCourseInstallment.installmentNo : null,
        {
          validators: [Validators.required],
        },
      ),
      installmentDate: new FormControl(
        studentCourseInstallment.installmentDate ? studentCourseInstallment.installmentDate : null,
        {
          validators: [Validators.required],
        },
      ),
      installmentAmount: new FormControl(
        studentCourseInstallment.installmentAmount ? studentCourseInstallment.installmentAmount : 0,
        {
          validators: [Validators.required, Validators.min(0)],
        },
      ),
      amountPending: new FormControl(
        studentCourseInstallment.installmentAmount ? studentCourseInstallment.amountPending : 0,
        {
          validators: [Validators.required, Validators.min(0)],
        },
      ),
      receiptId: new FormControl(
        studentCourseInstallment.receiptId ? studentCourseInstallment.receiptId : null,
        {
          validators: [],
        },
      ),
      status: new FormControl(
        studentCourseInstallment.status ? studentCourseInstallment.status : true,
        {
          validators: [],
        },
      ),
    });
  }

  private addStudentCourseInstallment(studentCourseInstallment: any) {
    const installments = this.getStudentCourseInstallments();
    installments.push(this.newStudentCourseInstallment(studentCourseInstallment));
  }

  onSelectInstallmentType(installmentType: any) {
    this.studentCourseFeeForm.patchValue({ amountCollected: 0 });
    if (installmentType === '0') {
      this.studentCourseFeeForm.get('noOfInstallments').disable();
      this.generateNoOfInstallments(1);
    } else if (installmentType === '1') {
      this.studentCourseFeeForm.get('noOfInstallments').disable();
      this.generateNoOfInstallments(2);
    } else if (installmentType === '2') {
      this.studentCourseFeeForm.get('noOfInstallments').disable();
      this.generateNoOfInstallments(4);
    } else if (installmentType === '3') {
      this.studentCourseFeeForm.get('noOfInstallments').disable();
      this.generateNoOfInstallments(this.course.basicDetails.duration);
    } else {
      this.studentCourseFeeForm.get('noOfInstallments').enable();
      const noOfInstallments: number = this.studentCourseFeeForm.value.noOfInstallments;
      this.generateNoOfInstallments(noOfInstallments);
    }
  }

  generateNoOfInstallments(noOfInstallments: number) {
    if (noOfInstallments) {
      noOfInstallments = noOfInstallments > 0 ? noOfInstallments : 3;
      this.studentCourseFeeForm.patchValue({ amountCollected: 0 });

      this.studentCourseFeeForm.patchValue({ noOfInstallments });

      const interval = 2592000000; // 30 * 24 * 60 * 60 * 1000

      const duration: number = +this.course.basicDetails.duration;
      const installmentDuration = duration / noOfInstallments;
      const date = this.studentCourseFeeForm.value.date;

      const netPayable: number = +this.studentCourseForm.value.netPayable;
      const amount: number = netPayable / noOfInstallments;
      const pendingAmount: number = +this.studentCourseFeeForm.value.pendingAmount;

      this.resetStudentCourseInstallments();

      for (let i = 0; i < noOfInstallments; i++) {
        const installmentDate = this.dateService.millisecondsToDateString(
          this.dateService.dateToMilliseconds(date) + interval * (installmentDuration * i),
        );

        let amountPending = pendingAmount - +(amount * (i + 1));
        amountPending = amountPending < 0 ? 0 : amountPending;

        const installmentData = {
          _id: new ObjectId(),
          installmentNo: (i + 1).toString(),
          installmentDate,
          installmentAmount: Math.ceil(amount),
          amountPending: Math.ceil(amountPending),
          receiptId: null,
          status: true,
        };
        this.addStudentCourseInstallment(installmentData);

        const installment = this.getStudentCourseInstallments()[i];
        installment
          .get('installmentAmount')
          .setValidators([
            Validators.min(this.getMinInstallmentAmount(i)),
            Validators.max(this.getMaxInstallmentAmount(i)),
          ]);

        installment
          .get('amountPending')
          .setValidators([
            Validators.min(this.getMinInstallmentPendingAmount(i)),
            Validators.max(this.getMaxInstallmentPendingAmount(i)),
          ]);
      }

      const installmentType = this.studentCourseFeeForm.value.installmentType;

      if (installmentType === '4') {
        this.enableStudentCourseInstallmentFields();
      } else {
        this.disableStudentCourseInstallmentFields();
      }
    }
  }

  customInstallmentAmount(amount: number, i: number) {
    const installments = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();

    const pendingAmount: number =
      i === 0
        ? this.studentCourseFeeForm.getRawValue().totalAmount
        : installments[i - 1].getRawValue().amountPending;

    const amountPending: number = pendingAmount - amount;

    installments[i].patchValue({ amountPending });

    const noOfUnchangedInstallments: number =
      noOfInstallments - (i + 1) === 0 ? noOfInstallments - (i + 1) : 1;

    const installmentAmount: number = Math.ceil(amountPending / noOfUnchangedInstallments);

    for (let j = 0; j < noOfUnchangedInstallments; j++) {
      let curAmountPending = pendingAmount - +(installmentAmount * (j + 1));
      curAmountPending = curAmountPending < 0 ? 0 : curAmountPending;

      installments[i + j + 1].patchValue({
        installmentAmount,
        amountPending: curAmountPending,
      });
    }
  }

  getMinInstallmentDate(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();
    if (i === 0) {
      this.studentCourseFeeForm.value.date;
    } else {
      return installments[i - 1].getRawValue().installmentDate;
    }
  }

  getMaxInstallmentDate(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();

    return this.dateService.millisecondsToDateString(
      this.dateService.dateToMilliseconds(this.studentCourseFeeForm.value.date) +
        1000 * 60 * 60 * 24 * 30 * this.course.basicDetails.duration,
    );
  }

  getMinInstallmentAmount(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();
    if (i === 0 && noOfInstallments === 1) {
      return this.studentCourseFeeForm.getRawValue().totalAmount;
    } else if (i === 0 && noOfInstallments > 1) {
      return 1;
    } else if (i === noOfInstallments - 1) {
      return installments[i - 1].getRawValue().amountPending;
    }
  }

  getMaxInstallmentAmount(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();

    if (i === 0 && noOfInstallments >= 1) {
      return this.studentCourseFeeForm.getRawValue().totalAmount;
    } else {
      return installments[i - 1].getRawValue().amountPending;
    }
  }

  getMinInstallmentPendingAmount(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();

    if (i === 0 && noOfInstallments >= 1) {
      return 0;
    } else if (i === noOfInstallments - 1) {
      return 0;
    } else {
      return (
        installments[i - 1].getRawValue().amountPending -
        installments[i].getRawValue().installmentAmount
      );
    }
  }

  getMaxInstallmentPendingAmount(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();

    if (i === 0 && noOfInstallments >= 1) {
      return this.studentCourseFeeForm.getRawValue().totalAmount;
    } else if (i < noOfInstallments - 1 && noOfInstallments > 1) {
      return (
        installments[i - 1].getRawValue().amountPending -
        installments[i].getRawValue().installmentAmount
      );
    } else if (i === noOfInstallments - 1) {
      return 0;
    }
  }

  getNoOfInstallments() {
    return this.studentCourseFeeForm.getRawValue().noOfInstallments;
  }

  enableStudentCourseInstallmentFields() {
    const installments = this.getStudentCourseInstallments();
    installments.forEach((installment: FormGroup) => {
      installment.get('installmentAmount').enable();
      installment.get('amountPending').enable();
    });
  }

  disableStudentCourseInstallmentFields() {
    const installments = this.getStudentCourseInstallments();
    installments.forEach((installment: FormGroup) => {
      installment.get('installmentAmount').disable();
      installment.get('amountPending').disable();
    });
  }

  previousStep() {
    if (this.studentCourse) {
      this.disableStudentCourseDetails();
    }
    if (this.studentCourseInstallment) {
      this.disableStudentCourseInstallmentFields();
    }
    this.stepper.previous();
  }

  studentCourseFormSubmit() {
    this.studentCourseForm.markAllAsTouched();
    if (this.studentCourseForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Details are Required');
      return;
    }
    if (this.studentCourse) {
      this.enableStudentCourseDetails();
    }
    this.stepper.next();
  }

  studentCourseFeeFormSubmit() {
    this.studentCourseFeeForm.markAllAsTouched();
    if (this.studentCourseFeeForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Fee Details are Required');
      return;
    }
    if (this.studentCourseInstallment) {
      this.enableStudentCourseInstallmentFields();
    }
    this.stepper.next();
  }

  studentCourseInstallmentFormSubmit() {
    this.studentCourseInstallmentForm.markAllAsTouched();
    if (this.studentCourseInstallmentForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Installment Details are Required');
      return;
    }
    if (this.studentCourseInstallment) {
      this.enableStudentCourseInstallmentFields();
    }
    this.stepper.next();
  }

  saveStudentCourse() {
    this.studentCourseForm.markAllAsTouched();
    this.studentCourseFeeForm.markAllAsTouched();
    this.studentCourseInstallmentForm.markAllAsTouched();

    if (this.studentCourseForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Details are Required');
      return;
    } else if (this.studentCourseFeeForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Fee Details are Required');
      return;
    } else if (this.studentCourseInstallmentForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Installment Details are Required');
      return;
    }

    this.loading = true;
    this.loading = false;
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  getCourse(courseId: string) {
    const course = this.courses.find((curCourse: CourseModel) => curCourse._id === courseId);

    if (course) {
      return course.basicDetails.courseName;
    }

    return '--';
  }

  getBatch(batchId: string) {
    const batch = this.batches.find((curBatch: BatchModel) => curBatch._id === batchId);

    if (batch) {
      return batch.basicDetails.batchName;
    }

    return '--';
  }

  getDiscount(discountId: string) {
    const discount = this.discounts.find(
      (curDiscount: DiscountAndOfferModel) => curDiscount._id === discountId,
    );

    if (discount) {
      const discountString =
        discount.offerName +
        ' (' +
        discount.code +
        ' - ' +
        discount.discountAmount +
        (discount.discountType === 'percentage' ? '%' : '.00') +
        ')';

      return discountString;
    }

    return '--';
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {}
}
