import { NbToastrService } from '@nebular/theme';
import { EmployeeNameIdModel } from './../../../../../../models/branch-employee.model';
import { SubjectModel } from './../../../../../../models/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-repeat-schedule',
  templateUrl: './repeat-schedule.component.html',
  styleUrls: ['./repeat-schedule.component.scss'],
})
export class RepeatScheduleComponent implements OnInit {
  loading: boolean;
  repeatScheduleForm: FormGroup;

  @Input() repeatSchedule: any;
  @Input() subjects: SubjectModel[];
  @Input() teachers: EmployeeNameIdModel[];

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  constructor(private toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.loading = true;

    this.repeatScheduleForm = new FormGroup({
      date: new FormControl(this.repeatSchedule.date, {
        validators: [Validators.required],
      }),
      startTime: new FormControl(this.repeatSchedule.startTime, {
        validators: [Validators.required],
      }),
      endTime: new FormControl(this.repeatSchedule.endTime, { validators: [Validators.required] }),
      subject: new FormControl(this.repeatSchedule.subject ? this.repeatSchedule.subject : '', {
        validators: [Validators.required],
      }),
      teacher: new FormControl(this.repeatSchedule.teacher ? this.repeatSchedule.teacher : '', {
        validators: [Validators.required],
      }),
      topic: new FormControl(this.repeatSchedule.topic ? this.repeatSchedule.topic : 'classroom', {
        validators: [Validators.required],
      }),
      sessionType: new FormControl(this.repeatSchedule.sessionType, {
        validators: [Validators.required],
      }),
    });
  }

  onClose() {
    this.close.emit();
  }

  saveSchedule() {
    if (this.repeatScheduleForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Schedule Fields are Required');
      return;
    }
    this.repeatSchedule.date = this.repeatScheduleForm.value.date;
    this.repeatSchedule.startTime = this.repeatScheduleForm.value.startTime;
    this.repeatSchedule.endTime = this.repeatScheduleForm.value.endTime;
    this.repeatSchedule.subject = this.repeatScheduleForm.value.subject;
    this.repeatSchedule.topic = this.repeatScheduleForm.value.topic;
    this.repeatSchedule.teacher = this.repeatScheduleForm.value.teacher;
    this.repeatSchedule.sessionType = this.repeatScheduleForm.value.sessionType;
    this.submit.emit(this.repeatSchedule);
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
