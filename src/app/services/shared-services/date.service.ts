import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private date: Date;
  private dateString: string;
  private dateInMilliseconds: number;
  private dateTimeString: string;
  private dateTimeISOString: string;

  constructor() {
    this.date = new Date();
    this.dateString = this.convertToDateString(this.date);
    this.dateInMilliseconds = this.date.getMilliseconds();
    this.dateTimeString = this.convertToDateTimeString(this.date);
    this.dateTimeISOString = this.convertToISOString(this.date);
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
    return new Date(date).getMilliseconds();
  }

  millisecondsToDate(milliseconds: number) {
    return new Date(milliseconds);
  }

  millisecondsToDateString(milliseconds: number) {
    return this.convertToDateString(new Date(milliseconds));
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
    } else if (hours >= 12) {
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
}
