import { CategoryModel, BranchModel } from '../../../../models/branch.model';
import { DateService } from './../../../../services/shared-services/date.service';
import { UserService } from './../../../../services/shared-services/user.service';
import { environment } from './../../../../../environments/environment.prod';
import { EncryptService } from './../../../../services/shared-services/encrypt.service';
import { BranchStudentService } from '../../../../services/branch-student.service';
import { StudentService } from './../../../../services/student.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentModel } from '../../../../models/student.model';
import { BranchStudentModel } from '../../../../models/branch-student.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';

import { NbToastrService, NbStepperComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  submit: boolean;

  private branchId: string;
  private studentId: string;
  private branchStudentId: string;
  roles: string[];
  userExist: boolean;

  alreadyRegisteredUser: boolean;

  student: StudentModel;
  branchStudent: BranchStudentModel;
  categories: CategoryModel[];

  studentForm: FormGroup;
  branchStudentForm: FormGroup;
  studentSearchForm: FormGroup;
  constructor(
    private branchService: BranchService,
    private studentService: StudentService,
    public dateService: DateService,
    private userService: UserService,
    private toastrService: NbToastrService,
    private branchStudentService: BranchStudentService,
    private encryptService: EncryptService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.studentId = this.studentService.getStudentId();
    this.branchStudentId = this.branchStudentService.getBranchStudentId();

    let mode: string;

    this.route.data.subscribe((data: any) => {
      mode = data.mode;
    });

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.studentId && !this.branchStudentId) {
      this.showToastr('top-right', 'danger', 'Student Not Found');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.alreadyRegisteredUser = false;

    this.categories = [];

    this.getCategories();

    this.studentSearchForm = new FormGroup({
      studentId: new FormControl(null, { validators: [Validators.required] }),
    });

    this.studentForm = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      phone: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      }),
      birthDate: new FormControl(null, {
        validators: [],
      }),
      parentName: new FormControl(null, {
        validators: [],
      }),
      parentEmail: new FormControl(null, {
        validators: [Validators.email],
      }),
      parentPhone: new FormControl(null, {
        validators: [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      }),
      address: new FormControl(null, { validators: [] }),
    });

    this.branchStudentForm = new FormGroup({
      category: new FormControl('', {
        validators: [Validators.required],
      }),
      admissionDate: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [],
      }),
    });

    if (mode && this.studentId && this.branchStudentId) {
      this.branchStudentService
        .getBranchStudentForEditing(this.branchStudentId, this.studentId)
        .subscribe(
          (res: any) => {
            this.student = res.student;
            this.branchStudent = res.branchStudent;
            this.userExist = false;
            this.studentSearchForm.patchValue({
              studentId: this.student.imsMasterId,
            });

            this.studentForm.patchValue({
              name: this.student.name,
              email: this.student.email,
              phone: this.student.phone,
              parentName: this.student.parentName,
              parentEmail: this.student.parentEmail,
              parentPhone: this.student.parentPhone,
              birthDate: this.student.birthDate,
              address: this.student.address,
            });

            this.disableStudentDetails();

            this.branchStudentForm.patchValue({
              category: this.branchStudent.category,
              admissionDate: this.branchStudent.admissionDate,
              description: this.branchStudent.description,
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

  private getCategories() {
    this.branchService.getBranchData().subscribe((branch: BranchModel) => {
      if (branch) {
        this.categories = branch.categories;
      }
    });

    if (!this.categories) {
      this.branchService.getBranch(this.branchId).subscribe(
        (branch: BranchModel) => {
          this.branchService.setBranchData(branch);
          this.categories = branch.categories;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    }
  }

  checkUser() {
    if (this.studentForm.get('email').valid && !this.student) {
      this.userService.checkUser(this.studentForm.value.email).subscribe(
        (res: any) => {
          this.userExist = res.exist;
        },
        (error: any) => {},
      );
    }
  }

  alreadyRegister(alreadyRegisteredUser: boolean) {
    this.alreadyRegisteredUser = alreadyRegisteredUser;
  }

  searchStudent() {
    this.studentSearchForm.markAllAsTouched();
    if (this.studentSearchForm.invalid) {
      this.showToastr('top-right', 'danger', 'Enter Student Id');
      return;
    }
    this.studentId = this.studentSearchForm.value.studentId;
    this.loading = true;
    this.studentService.searchStudent(this.studentId, this.branchId).subscribe(
      (student: StudentModel) => {
        this.student = student;

        this.studentId = student.imsMasterId;
        this.userExist = false;
        this.alreadyRegisteredUser = false;

        this.studentSearchForm.patchValue({
          studentId: this.student.imsMasterId,
        });

        this.studentForm.patchValue({
          name: this.student.name,
          email: this.student.email,
          phone: this.student.phone,
          parentName: this.student.parentName,
          parentEmail: this.student.parentEmail,
          parentPhone: this.student.parentPhone,
          birthDate: this.student.birthDate,
          address: this.student.address,
        });

        this.disableStudentDetails();

        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.studentId = null;
        this.loading = false;
      },
    );
  }

  private enableStudentDetails() {
    this.studentForm.get('name').enable();
    this.studentForm.get('email').enable();
    this.studentForm.get('phone').enable();
    this.studentForm.get('parentName').enable();
    this.studentForm.get('parentEmail').enable();
    this.studentForm.get('parentPhone').enable();
    this.studentForm.get('birthDate').enable();
    this.studentForm.get('address').enable();
    this.studentSearchForm.get('studentId').enable();
  }

  private disableStudentDetails() {
    this.studentForm.get('name').disable();
    this.studentForm.get('email').disable();
    this.studentForm.get('phone').disable();
    this.studentForm.get('parentName').disable();
    this.studentForm.get('parentEmail').disable();
    this.studentForm.get('parentPhone').disable();
    this.studentForm.get('birthDate').disable();
    this.studentForm.get('address').disable();
    this.studentSearchForm.get('studentId').disable();
  }

  previousStep() {
    this.stepper.previous();
    if (this.student) {
      this.disableStudentDetails();
    }
  }

  studentFormSubmit() {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Details are Required');
      return;
    } else if (this.userExist) {
      this.showToastr('top-right', 'danger', 'User with this email address is already Exist');
      return;
    }
    if (this.student) {
      this.enableStudentDetails();
    }
    this.stepper.next();
  }

  branchStudentFormSubmit() {
    this.branchStudentForm.markAllAsTouched();
    if (this.studentForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Branch Details are Required');
      return;
    }

    this.stepper.next();
  }

  saveStudent() {
    this.studentForm.markAllAsTouched();
    this.branchStudentForm.markAllAsTouched();

    if (this.studentForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Details are Required');
      return;
    } else if (this.studentForm.invalid) {
      this.showToastr('top-right', 'danger', 'Student Branch Details are Required');
      return;
    }

    this.submit = true;

    if (!this.studentId && !this.branchStudentId) {
      const newStudent: any = this.studentForm.value;
      newStudent.password = this.encryptService.encrypt(newStudent.phone, environment.encKey);
      const newBranchStudent: any = this.branchStudentForm.value;
      newBranchStudent.branch = this.branchId;
      this.studentService.addStudent(newStudent, newBranchStudent).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Student Added Successfully');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else if (this.studentId && !this.branchStudentId) {
      const newBranchStudent: any = this.branchStudentForm.value;
      newBranchStudent.branch = this.branchId;
      newBranchStudent.student = this.studentId;
      this.branchStudentService.newBranchStudent(newBranchStudent).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Branch Student added Successfully');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else if (this.studentId && this.branchStudentId) {
      const branchStudent: any = this.branchStudentForm.value;
      branchStudent._id = this.branchStudentId;
      this.branchStudentService.editBranchStudent(branchStudent).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Student Updated Successfully');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      this.showToastr('top-right', 'danger', 'Invalid data');
      this.submit = false;
    }
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  getCategory(categoryId: string) {
    const category = this.categories.find(
      (curCategory: CategoryModel) => curCategory._id === categoryId,
    );

    if (category) {
      return category.category;
    }

    return '--';
  }

  back() {
    const type = this.studentService.getStudentType();
    this.router.navigate(['../'], {
      relativeTo: this.route,
      queryParams: { type },
      replaceUrl: true,
    });
  }

  ngOnDestroy() {
    this.studentService.deleteStudentId();
    this.branchStudentService.deleteBranchStudentId();
  }
}
