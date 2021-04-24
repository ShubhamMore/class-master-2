import { BranchService } from './../../../../services/branch.service';
import { EmployeeLeaveService } from './../../../../services/employee-leave.service';
import { EmployeeLeaveModel } from '../../../../models/employee-leave.model';
import { DateService } from './../../../../services/shared-services/date.service';
import { NbDialogRef, NbToastrService, NbStepperComponent } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-save-leave',
  templateUrl: './save-leave.component.html',
  styleUrls: ['./save-leave.component.scss'],
})
export class SaveLeaveComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  submit: boolean;

  private branchId: string;

  durations: string[];

  leaveTypes: string[];

  leave: EmployeeLeaveModel;
  leaveForm: FormGroup;

  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    private leaveService: EmployeeLeaveService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<SaveLeaveComponent>,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.onClose();
      return;
    }

    this.durations = ['single', 'multiple', 'hourly'];
    this.leaveTypes = [
      'Emergency Leave',
      'No Call No Show',
      'Planned Leave',
      'Sick Leave',
      'Unplanned Leave',
    ];

    this.leaveService.getEmployeeLeaveData().subscribe((leave: EmployeeLeaveModel) => {
      this.leave = leave;

      this.leaveForm = new FormGroup(
        {
          leaveType: new FormControl(leave ? leave.leaveType : '', {
            validators: [Validators.required],
          }),
          duration: new FormControl(leave ? leave.duration : this.durations[0], {
            validators: [Validators.required],
          }),
          date: new FormControl(leave ? leave.date : this.dateService.getDateString(), {
            validators: [Validators.required],
          }),
          startDate: new FormControl(leave ? leave.startDate : null, {
            validators: [Validators.required],
          }),
          endDate: new FormControl(leave ? leave.endDate : null, {
            validators: [],
          }),
          hours: new FormControl(leave ? leave.hours : null, {
            validators: [],
          }),
          reason: new FormControl(leave ? leave.reason : null, {
            validators: [Validators.required],
          }),
        },
        {
          validators: this.durationValidator.bind(this),
        },
      );

      this.onChangeDuration(this.leaveForm.value.duration);

      this.loading = false;
    });
  }

  durationValidator(group: FormGroup): { [s: string]: boolean } {
    const duration = group.value.duration;
    if (duration === 'multiple') {
      const endDate = group.value.endDate;
      if (!endDate) {
        return { invalidEndDate: true };
      } else {
        return null;
      }
    } else if (duration === 'hourly') {
      const hours = group.value.hours;
      if (!hours) {
        return { invalidHours: true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  onChangeDuration(duration: string) {
    if (duration === 'single') {
      this.leaveForm.patchValue({ endDate: null, hours: null });
      this.leaveForm.get('endDate').disable();
      this.leaveForm.get('hours').disable();
    } else if (duration === 'multiple') {
      this.leaveForm.patchValue({ hours: null });
      this.leaveForm.get('endDate').enable();
      this.leaveForm.get('hours').disable();
    } else if (duration === 'hourly') {
      this.leaveForm.patchValue({ endDate: null });
      this.leaveForm.get('endDate').disable();
      this.leaveForm.get('hours').enable();
    } else {
      this.leaveForm.get('endDate').enable();
      this.leaveForm.get('hours').enable();
    }
  }

  submitLeave() {
    this.leaveForm.markAllAsTouched();
    if (this.leaveForm.invalid) {
      this.showToastr('top-right', 'danger', 'Leave Details are required');
      return;
    }
    this.stepper.next();
  }

  saveLeave() {
    this.leaveForm.markAllAsTouched();

    if (this.leaveForm.invalid) {
      this.showToastr('top-right', 'danger', 'Leave Details are required');
      return;
    }

    this.submit = true;

    const leave: any = { branch: this.branchId, ...this.leaveForm.getRawValue() };

    if (!this.leave) {
      this.leaveService.createEmployeeLeave(leave).subscribe(
        (resLeave: EmployeeLeaveModel) => {
          this.ref.close({ leave: resLeave, type: 'new' });
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      leave._id = this.leave._id;

      this.leaveService.updateEmployeeLeave(leave).subscribe(
        (res: any) => {
          this.ref.close({ leave: leave, type: 'edit' });
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    }
  }

  onClose() {
    this.ref.close();
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.leaveService.deleteEmployeeLeaveData();
  }
}
