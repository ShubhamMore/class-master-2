import { BranchEmployeeService } from './../../../../../services/branch-employee.service';
import { BranchEmployeeModel } from './../../../../../models/branch-employee.model';
import { ScheduleService } from './../../../../../services/schedule.service';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { BatchService } from './../../../../../services/batch.service';
import { CourseService } from './../../../../../services/course.service';
import { BatchModel } from './../../../../../models/batch.model';
import { CourseModel, SubjectModel } from './../../../../../models/course.model';
import { CategoryModel } from './../../../../../models/branch.model';
import { ScheduleModel } from './../../../../../models/schedule.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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
  schedule: ScheduleModel;
  subjects: SubjectModel[];
  teachers: BranchEmployeeModel[];

  repeatUpToTouched: boolean;
  repeatDaysTouched: boolean;

  weekdaysTouched: boolean;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private branchEmployeeService: BranchEmployeeService,
    public dateService: DateService,
    private batchService: BatchService,
    private scheduleService: ScheduleService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    this.scheduleId = this.scheduleService.getScheduleId();

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      // this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.scheduleId) {
      this.showToastr('top-right', 'danger', 'Schedule Not Found');
      // this.router.navigate(['../page-not-found'], { relativeTo: this.route });
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
    this.repeat = false;

    this.repeatUpToTouched = false;
    this.repeatDaysTouched = false;

    this.weekdaysTouched = false;

    this.weekDays = this.dateService.getWeekDays();

    this.branchEmployeeService
      .getBranchEmployeesData()
      .subscribe((employees: BranchEmployeeModel[]) => {
        this.teachers = employees;
      });

    this.batch.subjects.forEach((curSubject: any) => {
      const mySubject = this.course.subjects.find(
        (subject: SubjectModel) => subject._id === curSubject.subject,
      );
      this.subjects.push(mySubject);
    });

    this.scheduleForm = new FormGroup({
      date: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      startTime: new FormControl(null, { validators: [Validators.required] }),
      endTime: new FormControl(null, { validators: [Validators.required] }),
      subject: new FormControl(null, { validators: [Validators.required] }),
      teacher: new FormControl(null, { validators: [Validators.required] }),
      topic: new FormControl(null, { validators: [Validators.required] }),
      sessionType: new FormControl('classroom', { validators: [Validators.required] }),
    });

    if (mode && this.scheduleId) {
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

  onChangeRepeatUpToDate() {
    this.repeatUpToTouched = true;
  }

  onSelectRepeatDay(checked: any, day: number) {
    this.repeatDaysTouched = true;
    if (checked) {
      this.repeatDays.push(day);
    } else {
      const i = this.repeatDays.indexOf(day);
      this.repeatDays.splice(i, 1);
    }
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

    this.stepper.next();
  }

  submitScheduleRepeatForm() {
    if (this.repeat && !this.repeatUpTo) {
      this.showToastr('top-right', 'danger', 'Receipt Up To date is Required');
      return;
    } else if (this.repeat && this.repeatDays.length === 0) {
      this.showToastr('top-right', 'danger', 'At least one Repeat Day is Required');
      return;
    }

    this.repeatDays.sort();

    this.stepper.next();
  }

  saveSchedule() {
    this.scheduleForm.markAllAsTouched();
    if (this.scheduleForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Schedule Fields are Required');
      return;
    }

    this.loading = true;

    const schedule: any = this.scheduleForm.value;
    schedule.branch = this.branchId;
    schedule.category = this.category._id;
    schedule.course = this.course._id;
    schedule.batch = this.batch._id;

    if (!this.schedule) {
      const scheduleRepeat: any = {
        repeat: this.repeat,
        repeatUpTo: this.repeatUpTo,
        repeatDays: this.repeatDays,
      };

      this.scheduleService.addSchedule(schedule, scheduleRepeat).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Schedule Added Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      schedule._id = this.schedule._id;
      this.scheduleService.editSchedule(schedule).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Schedule Updated Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
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
      (curTeacher: BranchEmployeeModel) => curTeacher.employee === teacherId,
    );
    if (teacher) {
      return teacher.employee;
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
    this.scheduleService.deleteScheduleData();
  }
}
