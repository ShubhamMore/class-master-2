import { DateService } from './../../../../services/shared-services/date.service';
import { RoleService } from './../../../../services/role.service';
import { UserService } from './../../../../services/shared-services/user.service';
import { environment } from './../../../../../environments/environment.prod';
import { EncryptService } from './../../../../services/shared-services/encrypt.service';
import { BranchEmployeeService } from '../../../../services/branch-employee.service';
import { EmployeeService } from './../../../../services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeModel } from './../../../../models/employee.model';
import { BranchEmployeeModel } from '../../../../models/branch-employee.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  private branchId: string;
  private employeeId: string;
  private branchEmployeeId: string;
  roles: string[];
  userExist: boolean;

  alreadyRegisteredUser: boolean;

  employee: EmployeeModel;
  branchEmployee: BranchEmployeeModel;

  employeeForm: FormGroup;
  branchEmployeeForm: FormGroup;
  employeeSearchForm: FormGroup;
  constructor(
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    public dateService: DateService,
    private userService: UserService,
    private toastrService: NbToastrService,
    private branchEmployeeService: BranchEmployeeService,
    private encryptService: EncryptService,

    private router: Router,
    private route: ActivatedRoute,
  ) {
    route.queryParams.subscribe((param: Params) => {
      // put the code from `ngOnInit` here
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.employeeId = this.employeeService.getEmployeeId();
    this.branchEmployeeId = this.branchEmployeeService.getBranchEmployeeId();

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.employeeId && !this.branchEmployeeId) {
      this.showToastr('top-right', 'danger', 'Employee Not Found');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.roles = this.roleService.getEmployeeRoles();

    this.alreadyRegisteredUser = false;

    this.employeeSearchForm = new FormGroup({
      employeeId: new FormControl(null, { validators: [Validators.required] }),
    });

    this.employeeForm = new FormGroup({
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
      address: new FormControl(null, { validators: [] }),
      qualification: new FormControl(null, { validators: [] }),
    });

    this.branchEmployeeForm = new FormGroup({
      role: new FormControl(null, { validators: [Validators.required] }),
      basicSalary: new FormControl(null, {
        validators: [Validators.required, Validators.min(0)],
      }),
      description: new FormControl(null, {
        validators: [],
      }),
    });

    if (mode && this.employeeId && this.branchEmployeeId) {
      this.branchEmployeeService
        .getBranchEmployeeForEditing(this.branchEmployeeId, this.employeeId)
        .subscribe(
          (res: any) => {
            this.employee = res.employee;
            this.branchEmployee = res.branchEmployee;
            this.userExist = false;
            this.employeeSearchForm.patchValue({
              employeeId: this.employee.imsMasterId,
            });

            this.employeeForm.patchValue({
              name: this.employee.name,
              email: this.employee.email,
              phone: this.employee.phone,
              birthDate: this.employee.birthDate,
              address: this.employee.address,
            });

            this.disableEmployeeDetails();

            this.branchEmployeeForm.patchValue({
              role: this.branchEmployee.role,
              basicSalary: this.branchEmployee.basicSalary,
              description: this.branchEmployee.description,
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

  checkUser() {
    if (this.employeeForm.get('email').valid && !this.employee) {
      this.userService.checkUser(this.employeeForm.value.email).subscribe(
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

  searchEmployee() {
    this.employeeSearchForm.markAllAsTouched();
    if (this.employeeSearchForm.invalid) {
      this.showToastr('top-right', 'danger', 'Enter Employee Id');
      return;
    }
    this.employeeId = this.employeeSearchForm.value.employeeId;
    this.loading = true;
    this.employeeService.searchEmployee(this.employeeId).subscribe(
      (employee: EmployeeModel) => {
        this.employee = employee;

        this.employeeId = employee.imsMasterId;
        this.userExist = false;
        this.alreadyRegisteredUser = false;

        this.employeeSearchForm.patchValue({
          employeeId: this.employee.imsMasterId,
        });

        this.employeeForm.patchValue({
          name: this.employee.name,
          email: this.employee.email,
          phone: this.employee.phone,
          birthDate: this.employee.birthDate,
          address: this.employee.address,
        });

        this.disableEmployeeDetails();

        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.employeeId = null;
        this.loading = false;
      },
    );
  }

  private enableEmployeeDetails() {
    this.employeeForm.get('name').enable();
    this.employeeForm.get('email').enable();
    this.employeeForm.get('phone').enable();
    this.employeeForm.get('birthDate').enable();
    this.employeeForm.get('address').enable();
    this.employeeForm.get('qualification').enable();
    this.employeeSearchForm.get('employeeId').enable();
  }

  private disableEmployeeDetails() {
    this.employeeForm.get('name').disable();
    this.employeeForm.get('email').disable();
    this.employeeForm.get('phone').disable();
    this.employeeForm.get('birthDate').disable();
    this.employeeForm.get('address').disable();
    this.employeeForm.get('qualification').disable();
    this.employeeSearchForm.get('employeeId').disable();
  }

  previousStep() {
    this.stepper.previous();
    if (this.employee) {
      this.disableEmployeeDetails();
    }
  }

  employeeFormSubmit() {
    this.employeeForm.markAllAsTouched();
    if (this.employeeForm.invalid) {
      this.showToastr('top-right', 'danger', 'Employee Details are Required');
      return;
    } else if (this.userExist) {
      this.showToastr('top-right', 'danger', 'User with this email address is already Exist');
      return;
    }
    if (this.employee) {
      this.enableEmployeeDetails();
    }
    this.stepper.next();
  }

  branchEmployeeFormSubmit() {
    this.branchEmployeeForm.markAllAsTouched();
    if (this.employeeForm.invalid) {
      this.showToastr('top-right', 'danger', 'Employee Branch Details are Required');
      return;
    }
    this.stepper.next();
  }

  saveEmployee() {
    this.employeeForm.markAllAsTouched();
    this.branchEmployeeForm.markAllAsTouched();

    if (this.employeeForm.invalid) {
      this.showToastr('top-right', 'danger', 'Employee Details are Required');
      return;
    } else if (this.employeeForm.invalid) {
      this.showToastr('top-right', 'danger', 'Employee Branch Details are Required');
      return;
    }

    this.loading = true;

    if (!this.employeeId && !this.branchEmployeeId) {
      const newEmployee: any = this.employeeForm.value;
      newEmployee.password = this.encryptService.encrypt(newEmployee.phone, environment.encKey);
      const newBranchEmployee: any = this.branchEmployeeForm.value;
      newBranchEmployee.branch = this.branchId;
      this.employeeService.addEmployee(newEmployee, newBranchEmployee).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Employee Added Successfully');
          this.back();
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else if (this.employeeId && !this.branchEmployeeId) {
      const newBranchEmployee: any = this.branchEmployeeForm.value;
      newBranchEmployee.branch = this.branchId;
      newBranchEmployee.employee = this.employeeId;
      this.branchEmployeeService.newBranchEmployee(newBranchEmployee).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Branch Employee added Successfully');
          this.back();
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else if (this.employeeId && this.branchEmployeeId) {
      const branchEmployee: any = this.branchEmployeeForm.value;
      branchEmployee._id = this.branchEmployeeId;
      this.branchEmployeeService.editBranchEmployee(branchEmployee).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Employee Updated Successfully');
          this.back();
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      this.showToastr('top-right', 'danger', 'Invalid data');
      this.loading = false;
    }
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
    this.employeeService.deleteEmployeeId();
    this.branchEmployeeService.deleteBranchEmployeeId();
  }
}
