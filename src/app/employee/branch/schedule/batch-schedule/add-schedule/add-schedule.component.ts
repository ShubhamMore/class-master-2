import { RepeatScheduleComponent } from './repeat-schedule/repeat-schedule.component';
import { BranchEmployeeService } from './../../../../../services/branch-employee.service';
import { EmployeeNameIdModel } from '../../../../../models/branch-employee.model';
import { ScheduleService } from './../../../../../services/schedule.service';
import { NbToastrService, NbStepperComponent, NbDialogService } from '@nebular/theme';
import { BatchService } from './../../../../../services/batch.service';
import { CourseService } from './../../../../../services/course.service';
import { BatchModel } from '../../../../../models/batch.model';
import { CourseModel, SubjectModel } from '../../../../../models/course.model';
import { CategoryModel } from '../../../../../models/branch.model';
import { ScheduleModel } from '../../../../../models/schedule.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DateService } from './../../../../../services/shared-services/date.service';

@Component({
  selector: 'ngx-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  submit: boolean;

  branchId: string;
  category: CategoryModel;
  course: CourseModel;
  batch: BatchModel;
  scheduleForm: FormGroup;

  weekDays: string[];
  repeat: boolean;
  repeatUpTo: string;
  repeatDays: number[];
  scheduleId: string;
  repeatSchedules: any[];
  repeatSchedule: any;
  repeatScheduleEdit: boolean;
  repeatScheduleIndex: number;

  schedule: ScheduleModel;
  subjects: SubjectModel[];
  teachers: EmployeeNameIdModel[];

  repeatUpToTouched: boolean;
  repeatDaysTouched: boolean;

  weekdaysTouched: boolean;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private branchEmployeeService: BranchEmployeeService,
    private dialogService: NbDialogService,
    public dateService: DateService,
    private batchService: BatchService,
    private scheduleService: ScheduleService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    let mode: string;

    this.route.data.subscribe((data: any) => {
      // mode = data.mode;
    });

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    this.scheduleId = this.scheduleService.getScheduleId();

    if (mode && !['edit', 'date'].includes(mode)) {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.back();
      return;
    } else if (mode && mode === 'edit' && !this.scheduleId) {
      this.showToastr('top-right', 'danger', 'Schedule Not Found');
      this.back();
      return;
    }

    this.branchService.getCategoryData().subscribe((category: CategoryModel) => {
      this.category = category;
    });

    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      this.course = course;
    });

    this.batchService.getBatchData().subscribe((batch: BatchModel) => {
      this.batch = batch;
    });

    this.subjects = [];
    this.teachers = [];
    this.weekDays = [];
    this.repeatDays = [];
    this.repeatSchedules = [];
    this.repeat = false;
    this.repeatScheduleEdit = false;

    this.repeatUpTo = this.dateService.convertToDateString(
      this.dateService.addDaysInDate(
        this.batch.basicDetails.startDate,
        +this.course.basicDetails.duration * 30,
      ),
    );

    this.repeatUpToTouched = false;
    this.repeatDaysTouched = false;

    this.weekdaysTouched = false;

    this.weekDays = this.dateService.getWeekDays();

    this.branchEmployeeService
      .getBranchEmployeeNameIdsData()
      .subscribe((employees: EmployeeNameIdModel[]) => {
        this.teachers = employees;
      });

    this.batch.subjects.forEach((curSubject: any) => {
      const mySubject = this.course.subjects.find(
        (subject: SubjectModel) => subject._id === curSubject.subject,
      );
      this.subjects.push(mySubject);
    });

    let day: string;

    if (mode && mode === 'date') {
      const date = this.scheduleService.getScheduleDay();
      day = this.dateService.convertToDateString(date);
    }

    this.scheduleForm = new FormGroup({
      date: new FormControl(day ? day : this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      startTime: new FormControl(null, { validators: [Validators.required] }),
      endTime: new FormControl(null, { validators: [Validators.required] }),
      subject: new FormControl('', { validators: [Validators.required] }),
      teacher: new FormControl('', { validators: [Validators.required] }),
      topic: new FormControl(null, { validators: [Validators.required] }),
      sessionType: new FormControl('classroom', { validators: [Validators.required] }),
    });

    if (mode && mode === 'edit' && this.scheduleId) {
      this.scheduleService.getSchedule(this.scheduleId).subscribe(
        (schedule: ScheduleModel) => {
          this.schedule = schedule;

          this.scheduleForm.patchValue({
            date: this.schedule.date,
            startTime: this.schedule.startTime,
            endTime: this.schedule.endTime,
            subject: this.schedule.subject,
            teacher: this.schedule.teacher,
            topic: this.schedule.topic,
            sessionType: this.schedule.sessionType,
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

  onSelectSubject(subject: any) {
    const mySubject = this.batch.subjects.find((curSubject: any) => curSubject.subject === subject);
    if (mySubject && mySubject.teacher) {
      this.scheduleForm.patchValue({ teacher: mySubject.teacher });
    }
  }

  getSchedule() {
    const schedule: any = this.scheduleForm.value;
    schedule.branch = this.branchId;
    schedule.category = this.category._id;
    schedule.course = this.course._id;
    schedule.batch = this.batch._id;
    return { ...schedule };
  }

  CalculateRepeatSchedule() {
    const schedule: any = this.getSchedule();

    this.repeatSchedules = [];

    this.repeatSchedules.push(schedule);

    if (this.repeat && this.repeatUpTo && this.repeatDays.length > 0) {
      const day = 24 * 60 * 60 * 1000; // 1 Day mille-seconds

      let scheduleDateInMS = this.dateService.dateToMilliseconds(schedule.date);
      const repeatUpToDateInMS = this.dateService.dateToMilliseconds(this.repeatUpTo);

      const noOfDays = (repeatUpToDateInMS - scheduleDateInMS) / day;

      for (let i = 0; i < noOfDays; i++) {
        scheduleDateInMS += day;
        const date = new Date(scheduleDateInMS);
        if (this.repeatDays.includes(date.getDay())) {
          const newSchedule: any = {
            ...schedule,
          };
          newSchedule.date = this.dateService.convertToDateString(date);
          this.repeatSchedules.push(newSchedule);
        }
      }
    }
  }

  removeRepeatSchedule(i: number) {
    const repeatSchedule = this.repeatSchedules.splice(i, 1);
  }

  openRepeatScheduleDialog(type: string) {
    this.dialogService
      .open(RepeatScheduleComponent, {
        context: {
          subjects: this.subjects,
          teachers: this.teachers,
          repeatSchedule: this.repeatSchedule,
          type: type,
        },
      })
      .onClose.subscribe((schedule: any) => {
        if (schedule) {
          this.saveRepeatSchedule(schedule);
        } else {
          this.cancelRepeatSchedule();
        }
      });
  }

  editRepeatSchedule(schedule: any, i: number) {
    this.repeatSchedule = { ...schedule };
    this.repeatScheduleIndex = i;
    this.repeatScheduleEdit = true;
    this.openRepeatScheduleDialog('Edit');
  }

  cloneRepeatSchedule(schedule: any, i: number) {
    this.repeatSchedule = { ...schedule };
    this.repeatScheduleIndex = i;
    this.openRepeatScheduleDialog('Clone');
  }

  saveRepeatSchedule(schedule: any) {
    if (this.repeatScheduleEdit) {
      this.repeatSchedules[this.repeatScheduleIndex] = { ...schedule };
    } else {
      this.repeatSchedules.splice(this.repeatScheduleIndex + 1, 0, { ...schedule });
    }
    this.cancelRepeatSchedule();
  }

  cancelRepeatSchedule() {
    this.repeatScheduleIndex = null;
    this.repeatSchedule = null;
    this.repeatScheduleEdit = false;
  }

  onChangeRepeatUpToDate() {
    this.repeatUpToTouched = true;
    this.CalculateRepeatSchedule();
  }

  onSelectRepeatDay(checked: any, day: number) {
    this.repeatDaysTouched = true;
    if (checked) {
      this.repeatDays.push(day);
    } else {
      const i = this.repeatDays.indexOf(day);
      this.repeatDays.splice(i, 1);
    }
    this.CalculateRepeatSchedule();
  }

  previousStep() {
    this.stepper.previous();
  }

  submitScheduleForm() {
    this.scheduleForm.markAllAsTouched();
    if (this.scheduleForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Schedule Fields are Required');
      return;
    }

    if (!this.schedule) {
      this.CalculateRepeatSchedule();
    }

    this.stepper.next();
  }

  submitScheduleRepeatForm() {
    if (this.schedule) {
      return;
    } else if (this.repeat && !this.repeatUpTo) {
      this.showToastr('top-right', 'danger', 'Receipt Up To date is Required');
      return;
    } else if (this.repeat && this.repeatDays.length === 0) {
      this.showToastr('top-right', 'danger', 'At least one Repeat Day is Required');
      return;
    }

    this.stepper.next();
  }

  saveSchedule() {
    this.scheduleForm.markAllAsTouched();
    if (this.scheduleForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Schedule Fields are Required');
      return;
    }

    this.submit = true;

    if (!this.schedule) {
      this.scheduleService.addSchedule(this.repeatSchedules).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Schedule Added Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      const schedule: any = this.getSchedule();
      schedule._id = this.scheduleId;

      this.scheduleService.editSchedule(schedule).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Schedule Updated Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    }
  }

  getSubject(subjectId: string) {
    const subject = this.subjects.find((curSubject: SubjectModel) => curSubject._id === subjectId);
    if (subject) {
      return subject.subject;
    }

    return '--';
  }

  getTeacher(teacherId: string) {
    const teacher = this.teachers.find(
      (curTeacher: EmployeeNameIdModel) => curTeacher.employee === teacherId,
    );
    if (teacher) {
      return teacher.name;
    }

    return '--';
  }

  getRepeatDays() {
    const repeatDays = [];
    this.weekDays.forEach((day: string, i: number) => {
      if (this.repeatDays.includes(i)) {
        repeatDays.push(day);
      }
    });

    return repeatDays.join(', ');
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
    this.scheduleService.deleteScheduleId();
    this.scheduleService.deleteScheduleDay();
    this.scheduleService.deleteScheduleData();
  }
}
