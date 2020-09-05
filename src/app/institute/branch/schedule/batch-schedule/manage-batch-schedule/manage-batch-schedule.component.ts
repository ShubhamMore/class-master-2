import { NbToastrService } from '@nebular/theme';
import { BatchModel } from './../../../../../models/batch.model';
import { CategoryModel } from './../../../../../models/branch.model';
import { CourseModel, SubjectModel } from './../../../../../models/course.model';
import { CourseService } from './../../../../../services/course.service';
import { ScheduleService } from './../../../../../services/schedule.service';
import { ScheduleModel } from './../../../../../models/schedule.model';
import { DateService } from './../../../../../services/shared-services/date.service';
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from '../../../../../services/batch.service';

@Component({
  selector: 'ngx-manage-batch-schedule',
  templateUrl: './manage-batch-schedule.component.html',
  styleUrls: ['./manage-batch-schedule.component.scss'],
})
export class ManageBatchScheduleComponent implements OnInit {
  loading: boolean;
  branchId: string;

  category: CategoryModel;
  course: CourseModel;
  batch: BatchModel;

  curDate: Date;
  curMonth: number;
  curYear: number;

  startDate: Date;

  schedules: ScheduleModel[];

  scheduleCalenderType: number;

  noOfDays: number;
  days: string[];

  constructor(
    private branchService: BranchService,
    private scheduleService: ScheduleService,
    private courseService: CourseService,
    private batchService: BatchService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
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

    this.days = [];
    this.schedules = [];

    this.setCurDate(this.dateService.getDate());
    this.changeScheduleCalenderType(0);

    this.getSchedule();
  }

  setCurDate(date: Date) {
    this.curDate = date;
    this.curMonth = this.curDate.getMonth();
    this.curYear = this.curDate.getFullYear();
  }

  setStartDate() {
    const currentDate = new Date(this.curDate);
    if (this.scheduleCalenderType === 0) {
      this.startDate = new Date(currentDate);
    } else if (this.scheduleCalenderType === 1) {
      currentDate.setDate(currentDate.getDate() - currentDate.getDay());
      this.startDate = new Date(currentDate);
    } else {
      currentDate.setDate(1);
      this.startDate = new Date(currentDate);
    }
    this.calcNoOfDays();
    this.getSchedule();
  }

  calcNoOfDays() {
    let noOfDays: number;
    if (this.scheduleCalenderType === 0) {
      noOfDays = 1;
    } else if (this.scheduleCalenderType === 1) {
      noOfDays = 7;
    } else {
      noOfDays = this.daysInMonth(this.curMonth, this.curYear);
    }
    this.noOfDays = noOfDays;

    const day = 24 * 60 * 60 * 1000;

    this.days = [];

    for (let i = 0; i < noOfDays; i++) {
      const date = this.dateService.millisecondsToDate(
        this.dateService.dateToMilliseconds(this.startDate) + i * day,
      );
      this.days.push(date.toString().substring(0, 15));
    }
  }

  headerDate(): string {
    let headerDate: string;
    if (this.scheduleCalenderType === 0) {
      headerDate = this.curDate.toString().substring(4, 15);
    } else if (this.scheduleCalenderType === 1) {
      const currentDate = this.curDate;
      currentDate.setDate(currentDate.getDate() - currentDate.getDay());
      let date = new Date(currentDate);
      let firstDay = date.toString().substring(4, 10);
      if (date.getDate() > 25 && date.getMonth() === 11) {
        firstDay = firstDay + ', ' + date.getFullYear();
      }

      currentDate.setDate(currentDate.getDate() + 6);
      date = new Date(currentDate);

      let lastDay = date.toString().substring(4, 10);
      if (firstDay.split(',')[1]) {
        lastDay = lastDay + ', ' + date.getFullYear();
      }

      headerDate = firstDay + ' - ' + lastDay;
    } else {
      headerDate = this.dateService.getMonth(this.curMonth) + ' ' + this.curYear;
    }
    return headerDate;
  }

  goToToday() {
    this.setCurDate(this.dateService.getDate());
    this.setStartDate();
  }

  nextMonth() {
    this.curYear = this.curMonth === 11 ? this.curYear + 1 : this.curYear;
    this.curMonth = (this.curMonth + 1) % 12;
    this.curDate = new Date(this.curYear, this.curMonth, 1);
  }

  previousMonth() {
    this.curYear = this.curMonth === 0 ? this.curYear - 1 : this.curYear;
    this.curMonth = this.curMonth === 0 ? 11 : this.curMonth - 1;
    this.curDate = new Date(this.curYear, this.curMonth, 1);
  }

  nextWeek() {
    const nextDate: number = new Date(this.curDate).getDate() + 7;
    const date = new Date(this.curDate).setDate(nextDate);
    this.setCurDate(new Date(date));
  }

  previousWeek() {
    const previousDate: number = new Date(this.curDate).getDate() - 7;
    const date = new Date(this.curDate).setDate(previousDate);
    this.setCurDate(new Date(date));
  }

  nextDay() {
    const nextDate: number = new Date(this.curDate).getDate() + 1;
    const date = new Date(this.curDate).setDate(nextDate);
    this.setCurDate(new Date(date));
  }

  previousDay() {
    const previousDate: number = new Date(this.curDate).getDate() - 1;
    const date = new Date(this.curDate).setDate(previousDate);
    this.setCurDate(new Date(date));
  }

  next() {
    if (this.scheduleCalenderType === 0) {
      this.nextDay();
    } else if (this.scheduleCalenderType === 1) {
      this.nextWeek();
    } else {
      this.nextMonth();
    }
    this.setStartDate();
  }

  previous() {
    if (this.scheduleCalenderType === 0) {
      this.previousDay();
    } else if (this.scheduleCalenderType === 1) {
      this.previousWeek();
    } else {
      this.previousMonth();
    }
    this.setStartDate();
  }

  changeScheduleCalenderType(type: number) {
    this.scheduleCalenderType = type;
    this.setStartDate();
  }

  daysInMonth(iMonth: number, iYear: number): number {
    const daysInMonth = 32 - new Date(iYear, iMonth, 32).getDate();
    return daysInMonth;
  }

  getTime(startTime: string, endTime: string) {
    startTime = this.dateService.formatTime(startTime);
    endTime = this.dateService.formatTime(endTime);
    return startTime + ' - ' + endTime;
  }

  getTeacher(teacher: string) {
    return teacher;
  }

  getSubject(subject: string) {
    const mySubject = this.course.subjects.find(
      (curSubject: SubjectModel) => curSubject._id === subject,
    );

    if (!mySubject) {
      return '--';
    }

    return mySubject.subject;
  }

  addSchedule() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  addScheduleOfDay(day: string) {
    this.scheduleService.setScheduleDay(day);
    this.router.navigate(['../add'], { relativeTo: this.route, queryParams: { mode: 'date' } });
  }

  editSchedule(schedule: ScheduleModel) {
    this.scheduleService.setScheduleId(schedule._id);
    this.scheduleService.setScheduleData(schedule);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  deleteSchedule(id: string) {
    this.scheduleService.deleteSchedule(id).subscribe(
      (res: any) => {
        const index = this.schedules.findIndex((schedule: ScheduleModel) => schedule._id === id);
        if (index > 0) {
          this.schedules.splice(index, 1);
          this.showToastr('top-right', 'success', 'Schedule Deleted Successfully');
        }
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  getSchedule() {
    const startDate = this.dateService.convertToDateString(this.startDate);
    const endDate = this.dateService.convertToDateString(
      this.dateService.addDaysInDate(this.startDate, this.noOfDays),
    );
    this.loading = true;
    this.scheduleService
      .getAllSchedules(
        this.branchId,
        this.category._id,
        this.course._id,
        this.batch._id,
        this.dateService.reverseDate(startDate),
        this.dateService.reverseDate(endDate),
      )
      .subscribe(
        (schedules: ScheduleModel[]) => {
          this.schedules = schedules;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
  }

  getFilteredSchedule(date: any) {
    date = this.dateService.convertToDateString(date);
    const schedules: ScheduleModel[] = this.schedules.filter(
      (schedule: ScheduleModel) => schedule.date === date,
    );
    return schedules;
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
