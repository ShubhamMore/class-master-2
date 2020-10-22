import { InstallmentModel } from './../../../../../models/student-course-installment.model';
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
      this.router.navigate(['../'], { relativeTo: this.route });

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
          this.studentCourseInstallment = res.studentCourseInstallment;
          this.studentCourseForm.patchValue({
            course: this.studentCourse.course,
            activationDate: this.studentCourse.activationDate,
            rollNumber: this.studentCourse.rollNumber,
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

          if (this.studentCourseInstallment) {
            this.studentCourseFeeForm.patchValue({
              installmentType: this.studentCourseInstallment.installmentType,
              date: this.studentCourseInstallment.date,
              noOfInstallments: this.studentCourseInstallment.noOfInstallments,
              amountCollected: this.studentCourseInstallment.amountCollected,
              pendingAmount: this.studentCourseInstallment.pendingAmount,
              totalAmount: this.studentCourseInstallment.totalAmount,
            });

            this.disableStudentCourseFeeForm();

            this.resetStudentCourseInstallments();

            this.studentCourseInstallment.installments.forEach(
              (installment: InstallmentModel, i: number) => {
                this.addStudentCourseInstallment(installment);
                if (installment.receiptId) {
                  // this.getStudentCourseInstallments()[i].get('installmentDate').disable();
                }
              },
            );

            this.disableStudentCourseInstallmentFields();
          }

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

  private discountPercentageValidator(group: FormGroup): { [s: string]: boolean } {
    const discountType = group.getRawValue().additionalDiscountType;
    const amount = +group.getRawValue().additionalDiscountAmount;
    if (discountType === 'percentage' && amount > 100) {
      return { invalidDiscountPercentage: true };
    }
    return null;
  }

  checkRollNumber() {
    let rollNumber: any = this.studentCourseForm.getRawValue().rollNumber;
    const batchId = this.studentCourseForm.getRawValue().batch;
    if (rollNumber) {
      rollNumber = rollNumber.toString();
      if (
        this.studentCourse &&
        this.studentCourse.batch === batchId &&
        this.studentCourse.rollNumber === rollNumber
      ) {
        return;
      }
      const courseId = this.studentCourseForm.getRawValue().course;
      if (courseId && batchId) {
        this.studentCourseService
          .checkBatchRollNumber(this.branchId, this.categoryId, courseId, batchId, rollNumber)
          .subscribe(
            (res: any) => {
              this.rollNumberAlreadyExist = res.rollNumberExist;
            },
            (err: any) => {},
          );
      }
    }
  }

  onSelectCourse(courseId: string) {
    this.studentCourseForm.patchValue({ batch: '' });
    this.courseBatches = [];
    this.courseBatches = this.batches.filter(
      (curBatch: BatchModel) => curBatch.course === courseId,
    );
    this.course = this.courses.find((curCourse: CourseModel) => curCourse._id === courseId);
    this.calculateNetPayableAmount();
  }

  onSelectBatch(batchId: string) {
    if (batchId !== '') {
      this.studentCourseForm.get('rollNumber').enable();
      this.batch = this.batches.find((curBatch: BatchModel) => curBatch._id === batchId);
      this.checkRollNumber();
    } else {
      this.studentCourseForm.get('rollNumber').disable();
    }
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
    const additionalDiscountType = this.studentCourseForm.getRawValue().additionalDiscountType;
    const discount = this.discount ? +this.discount.discountAmount : 0;
    const additionalDiscount = +this.studentCourseForm.getRawValue().additionalDiscountAmount;

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

      const installmentType = this.studentCourseFeeForm.getRawValue().installmentType;
      this.onSelectInstallmentType(installmentType);
    }
  }

  private calculatePendingAmount() {
    let pendingAmount = 0;
    const totalAmount = this.studentCourseFeeForm.getRawValue().totalAmount;
    const amountCollected = this.studentCourseFeeForm.getRawValue().amountCollected;
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

  private enableStudentCourseFeeForm() {
    this.studentCourseFeeForm.get('installmentType').enable();
    this.studentCourseFeeForm.get('noOfInstallments').enable();
  }

  private disableStudentCourseFeeForm() {
    this.studentCourseFeeForm.get('installmentType').disable();
    this.studentCourseFeeForm.get('noOfInstallments').disable();
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
    return new FormGroup(
      {
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
          studentCourseInstallment.installmentDate
            ? studentCourseInstallment.installmentDate
            : null,
          {
            validators: [Validators.required],
          },
        ),
        installmentAmount: new FormControl(
          studentCourseInstallment.installmentAmount
            ? studentCourseInstallment.installmentAmount
            : 0,
          {
            validators: [Validators.required],
          },
        ),
        amountPending: new FormControl(
          studentCourseInstallment.installmentAmount ? studentCourseInstallment.amountPending : 0,
          {
            validators: [Validators.required],
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
      },
      {
        validators: [
          this.minInstallmentAmountValidator.bind(this),
          this.maxInstallmentAmountValidator.bind(this),
          this.minInstallmentPendingAmountValidator.bind(this),
          this.maxInstallmentPendingAmountValidator.bind(this),
        ],
      },
    );
  }

  private minInstallmentAmountValidator(group: FormGroup): { [s: string]: boolean } {
    const installmentNo = +group.getRawValue().installmentNo;
    const installmentAmount = +group.getRawValue().installmentAmount;
    const minInstallmentAmount = this.getMinInstallmentAmount(installmentNo - 1);
    if (installmentAmount < minInstallmentAmount) {
      return { invalidMinInstallmentAmount: true };
    }
    return null;
  }

  private maxInstallmentAmountValidator(group: FormGroup): { [s: string]: boolean } {
    const installmentNo = +group.getRawValue().installmentNo;
    const installmentAmount = +group.getRawValue().installmentAmount;
    const maxInstallmentAmount = this.getMaxInstallmentAmount(installmentNo - 1);
    if (installmentAmount > maxInstallmentAmount) {
      return { invalidMaxInstallmentAmount: true };
    }
    return null;
  }

  private minInstallmentPendingAmountValidator(group: FormGroup): { [s: string]: boolean } {
    const installmentNo = +group.getRawValue().installmentNo;
    const installmentPendingAmount = +group.getRawValue().amountPending;
    const minInstallmentPendingAmount = this.getMinInstallmentPendingAmount(installmentNo - 1);
    if (installmentPendingAmount < minInstallmentPendingAmount) {
      return { invalidMinInstallmentPendingAmount: true };
    }
    return null;
  }

  private maxInstallmentPendingAmountValidator(group: FormGroup): { [s: string]: boolean } {
    const installmentNo = +group.getRawValue().installmentNo;
    const installmentPendingAmount = +group.getRawValue().amountPending;
    const maxInstallmentPendingAmount = this.getMaxInstallmentPendingAmount(installmentNo - 1);
    if (installmentPendingAmount > maxInstallmentPendingAmount) {
      return { invalidMinInstallmentPendingAmount: true };
    }
    return null;
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
      const noOfInstallments: number = this.studentCourseFeeForm.getRawValue().noOfInstallments;
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
      const date = this.studentCourseFeeForm.getRawValue().date;

      const netPayable: number = +this.studentCourseForm.getRawValue().netPayable;
      const amount: number = netPayable / noOfInstallments;
      const pendingAmount: number = +this.studentCourseFeeForm.getRawValue().pendingAmount;

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
      }

      const installmentType = this.studentCourseFeeForm.getRawValue().installmentType;

      if (installmentType === '4') {
        this.enableStudentCourseInstallmentFields();
      } else {
        this.disableStudentCourseInstallmentFields();
      }
    }
  }

  customInstallmentAmount(amount: number, i: number) {
    if (
      !amount ||
      amount < this.getMinInstallmentAmount(i) ||
      amount > this.getMaxInstallmentAmount(i)
    ) {
      return;
    }

    const installments = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();

    const pendingAmount: number =
      i === 0
        ? this.studentCourseFeeForm.getRawValue().totalAmount
        : installments[i - 1].getRawValue().amountPending;

    const amountPending: number = pendingAmount - amount;

    installments[i].patchValue({ amountPending });
    const noOfUnchangedInstallments: number =
      noOfInstallments - (i + 1) > 0 ? noOfInstallments - (i + 1) : 1;
    let installmentAmount: number = Math.ceil(amountPending / noOfUnchangedInstallments);
    if (i !== noOfInstallments - 1) {
      for (let j = 0; j < noOfUnchangedInstallments; j++) {
        let curAmountPending = amountPending - +(installmentAmount * (j + 1));
        curAmountPending = curAmountPending < 0 ? 0 : curAmountPending;
        const index = i + j + 1;
        if (index === noOfInstallments - 1) {
          if (this.getMaxInstallmentAmount(index) < installmentAmount) {
            installmentAmount = this.getMaxInstallmentAmount(index);
          }
        }
        installments[index].patchValue({
          installmentAmount,
          amountPending: curAmountPending,
        });
      }
    }
  }

  getMinInstallmentDate(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    if (i === 0) {
      // First Installment
      return this.studentCourseFeeForm.getRawValue().date;
    } else {
      return installments[i - 1].getRawValue().installmentDate;
    }
  }

  getMaxInstallmentDate(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();

    if (i === 0 && noOfInstallments === 1) {
      // First Installment
      return this.studentCourseFeeForm.getRawValue().date;
    } else if (i === noOfInstallments - 1) {
      // Last Installment
      return this.dateService.millisecondsToDateString(
        this.dateService.dateToMilliseconds(this.studentCourseFeeForm.getRawValue().date) +
          1000 * 60 * 60 * 24 * 30 * this.course.basicDetails.duration,
      );
    } else {
      return installments[i + 1].getRawValue().installmentDate;
    }
  }

  getMinInstallmentAmount(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();
    if (i === 0 && noOfInstallments === 1) {
      // First Installment for only 1 installment
      return this.studentCourseFeeForm.getRawValue().totalAmount;
    } else if (i === 0 && noOfInstallments > 1) {
      // Last Installment for more than 1 installment
      return 1;
    } else if (i === noOfInstallments - 1) {
      // Last Installment
      return installments[i - 1].getRawValue().amountPending;
    } else {
      return 1;
    }
  }

  getMaxInstallmentAmount(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();

    if (i === 0 && noOfInstallments >= 1) {
      // First Instalment
      return this.studentCourseFeeForm.getRawValue().totalAmount;
    } else if (i === noOfInstallments - 1) {
      // Last Installment
      return installments[i - 1].getRawValue().amountPending;
    } else {
      return installments[i - 1].getRawValue().amountPending;
    }
  }

  getMinInstallmentPendingAmount(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();
    if (i === 0 && noOfInstallments >= 1) {
      // First Installment
      return 0;
    } else if (i === noOfInstallments - 1) {
      // Last Installment
      return 0;
    } else {
      if (installments[i]) {
        return (
          installments[i - 1].getRawValue().amountPending -
          installments[i].getRawValue().installmentAmount
        );
      }
      return 0;
    }
  }

  getMaxInstallmentPendingAmount(i: number) {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    const noOfInstallments: number = this.getNoOfInstallments();

    if (i === 0 && noOfInstallments >= 1) {
      // First Installment
      return this.studentCourseFeeForm.getRawValue().totalAmount;
    } else if (i === noOfInstallments - 1) {
      // Last Installment
      return 0;
    } else {
      if (installments[i]) {
        return (
          installments[i - 1].getRawValue().amountPending -
          installments[i].getRawValue().installmentAmount +
          1
        );
      }
    }
  }

  getNoOfInstallments(): number {
    return +this.studentCourseFeeForm.getRawValue().noOfInstallments;
  }

  private enableStudentCourseInstallmentFields() {
    const installments = this.getStudentCourseInstallments();
    installments.forEach((installment: FormGroup) => {
      installment.get('installmentAmount').enable();
      // installment.get('amountPending').enable();
    });
  }

  private disableStudentCourseInstallmentFields() {
    const installments = this.getStudentCourseInstallments();
    installments.forEach((installment: FormGroup) => {
      installment.get('installmentAmount').disable();
      // installment.get('amountPending').disable();
    });
  }

  previousStep() {
    if (this.studentCourse) {
      this.disableStudentCourseDetails();
    }
    const installmentType = this.studentCourseFeeForm.getRawValue().installmentType;
    if (this.studentCourseInstallment) {
      this.disableStudentCourseInstallmentFields();
    } else if (installmentType !== '4') {
      this.disableStudentCourseInstallmentFields();
    }
    this.stepper.previous();
  }

  studentCourseFormSubmit() {
    this.studentCourseForm.markAllAsTouched();
    if (this.rollNumberAlreadyExist) {
      this.showToastr('top-right', 'danger', 'Student Roll Number for this Batch already Exist');
      return;
    } else if (this.studentCourseForm.invalid) {
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
    this.stepper.next();
  }

  studentCourseInstallmentFormSubmit() {
    this.studentCourseInstallmentForm.markAllAsTouched();
    if (this.studentCourseInstallmentForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Installment Details are Required');
      return;
    }

    if (!this.validateStudentCourseInstallmentForm()) {
      this.showToastr('top-right', 'danger', 'Student Course Installment Details are Required');
      return;
    }

    this.enableStudentCourseInstallmentFields();

    this.stepper.next();
  }

  private validateStudentCourseInstallmentForm(): boolean {
    const installments: FormGroup[] = this.getStudentCourseInstallments();
    let invalidInstallments: boolean = false;
    installments.forEach((installment: FormGroup, i) => {
      if (installment.invalid) {
        invalidInstallments = true;
      }
    });

    if (invalidInstallments) {
      return false;
    }
    return true;
  }

  saveStudentCourse() {
    this.studentCourseForm.markAllAsTouched();
    this.studentCourseFeeForm.markAllAsTouched();
    this.studentCourseInstallmentForm.markAllAsTouched();

    if (this.rollNumberAlreadyExist) {
      this.showToastr('top-right', 'danger', 'Student Roll Number for this Batch already Exist');
      return;
    } else if (this.studentCourseForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Details are Required');
      return;
    } else if (this.studentCourseFeeForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Fee Details are Required');
      return;
    } else if (this.studentCourseInstallmentForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Course Installment Details are Required');
      return;
    } else if (!this.validateStudentCourseInstallmentForm()) {
      this.showToastr('top-right', 'danger', 'Student Course Installment Details are Required');
      return;
    }

    this.loading = true;

    const studentCourseDetails: any = this.studentCourseForm.getRawValue();
    studentCourseDetails.branch = this.branchId;
    studentCourseDetails.category = this.categoryId;
    studentCourseDetails.student = this.studentId;

    const studentCourseInstallmentDetails: any = this.studentCourseFeeForm.getRawValue();
    studentCourseInstallmentDetails.installments = this.studentCourseInstallmentForm.getRawValue().installments;
    studentCourseInstallmentDetails.branch = this.branchId;
    studentCourseInstallmentDetails.category = this.categoryId;
    studentCourseInstallmentDetails.course = studentCourseDetails.course;
    studentCourseInstallmentDetails.student = this.studentId;

    if (!this.studentCourse && !this.studentCourseInstallment) {
      this.studentCourseService
        .addStudentCourse(studentCourseDetails, studentCourseInstallmentDetails)
        .subscribe(
          (res: any) => {
            this.showToastr('top-right', 'success', 'Student Course Created Successfully!');
            this.back();
            this.loading = false;
          },
          (err: any) => {
            this.showToastr('top-right', 'danger', err);
            this.loading = false;
          },
        );
    } else if (this.studentCourse && !this.studentCourseInstallment) {
      this.studentCourseInstallmentService
        .addStudentCourseInstallment(this.studentCourse._id, studentCourseInstallmentDetails)
        .subscribe(
          (res: any) => {
            this.showToastr(
              'top-right',
              'success',
              'Student Course Installments Created Successfully!',
            );
            this.back();
            this.loading = false;
          },
          (err: any) => {
            this.showToastr('top-right', 'danger', err);
            this.loading = false;
          },
        );
    } else {
      studentCourseDetails._id = this.studentCourse._id;
      studentCourseInstallmentDetails._id = this.studentCourseInstallment._id;
      this.studentCourseService
        .editStudentCourse(studentCourseDetails, studentCourseInstallmentDetails)
        .subscribe(
          (res: any) => {
            this.showToastr('top-right', 'success', 'Student Course Updated Successfully!');
            this.back();
            this.loading = false;
          },
          (err: any) => {
            this.showToastr('top-right', 'danger', err);
            this.loading = false;
          },
        );
    }

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
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
