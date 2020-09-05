import { Injectable } from '@angular/core';

export class Month {
  constructor(public monthNo: string, public month: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private oneDayInMilliseconds: number;
  private date: Date;
  private dateString: string;
  private dateInMilliseconds: number;
  private dateTimeString: string;
  private dateTimeISOString: string;
  private months: Month[];
  private years: string[];
  private weekDays: string[];

  constructor() {
    this.date = new Date();
    this.oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    this.dateString = this.convertToDateString(this.date);
    this.dateInMilliseconds = this.date.getTime();
    this.dateTimeString = this.convertToDateTimeString(this.date);
    this.dateTimeISOString = this.convertToISOString(this.date);

    this.months = [
      { monthNo: '01', month: 'Jan' },
      { monthNo: '02', month: 'Feb' },
      { monthNo: '03', month: 'Mar' },
      { monthNo: '04', month: 'Apr' },
      { monthNo: '05', month: 'May' },
      { monthNo: '06', month: 'Jun' },
      { monthNo: '07', month: 'Jul' },
      { monthNo: '08', month: 'Aug' },
      { monthNo: '09', month: 'Sep' },
      { monthNo: '10', month: 'Oct' },
      { monthNo: '11', month: 'Nov' },
      { monthNo: '12', month: 'Dec' },
    ];

    this.weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    this.years = [];
    for (let year = 2018; year <= this.date.getFullYear(); year++) {
      this.years.push(year.toString());
    }
  }

  getWeekDays() {
    return this.weekDays;
  }

  getWeekDay(day: number) {
    return this.weekDays[day];
  }

  getDay(date: any) {
    if (!date) {
      return '--';
    }
    date = new Date(date);
    return this.weekDays[date.getDay()];
  }

  getMonths() {
    return this.months;
  }

  getMonth(month: number) {
    return this.months[month].month;
  }

  getYears() {
    return this.years;
  }

  getDate() {
    return this.date;
  }

  getDateString() {
    return this.dateString;
  }

  getFormattedDate() {
    return this.formatDate(this.dateString);
  }

  getDateInMilliseconds(): number {
    return this.dateInMilliseconds;
  }

  getDateTimeString() {
    return this.dateTimeString;
  }

  getDateTimeISOString() {
    return this.dateTimeISOString;
  }

  dateToMilliseconds(date: any) {
    return new Date(date).getTime();
  }

  millisecondsToDate(milliseconds: number) {
    return new Date(milliseconds);
  }

  millisecondsToDateString(milliseconds: number) {
    return this.convertToDateString(milliseconds);
  }

  convertToDate(date: any): Date {
    return new Date(date);
  }

  convertToDateString(date: any): string {
    if (!date) {
      return '--';
    }
    date = new Date(date);
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    );
  }

  reverseDate(date: string) {
    if (!date) {
      return '--';
    }
    return date.split('-').reverse().join('-');
  }

  addDaysInDate(date: any, days: number) {
    if (!date) {
      return '--';
    }
    const curDate = new Date(date);
    curDate.setDate(curDate.getDate() + (days - 1));

    const myDate = new Date(curDate);

    return myDate;
  }

  convertToISOString(date: any) {
    if (!date) {
      return '--';
    }
    return new Date(date).toISOString();
  }

  convertToDateTimeString(date: any): string {
    if (!date) {
      return '--';
    }
    date = new Date(date);
    return (
      this.convertToDateString(date) +
      'T' +
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0')
    );
  }

  formatDate(date: string) {
    if (!date) {
      return '--';
    }
    return date.split('-').reverse().join('-');
  }

  formatTime(time: any) {
    if (!time) {
      return '--';
    }
    time = time.split(':');
    let hours = +time[0];
    const minute = time[1];
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
    }

    return hours.toString().padStart(2, '0') + ':' + minute + ' ' + meridiem;
  }

  formatDateTime(date: any) {
    if (!date) {
      return '--';
    }
    date = new Date(date).toISOString().split('T');
    return this.formatDate(date[0]) + ' ' + this.formatTime(date[1]);
  }

  compareDates(date1: any, date2: any): boolean {
    return this.convertToDate(date1) <= this.convertToDate(date2);
  }

  dateDifferenceInDays(date1: any, date2: any) {
    const dateDifference = this.dateToMilliseconds(date2) - this.dateToMilliseconds(date1);
    return dateDifference / this.oneDayInMilliseconds;
  }
}
