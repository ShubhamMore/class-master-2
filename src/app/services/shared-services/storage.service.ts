import { _isNumberValue } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private KB: number;
  private MB: number;
  private GB: number;

  constructor() {
    this.KB = 1024;
    this.MB = 1024 * 1024;
    this.GB = 1024 * 1024 * 1024;
  }

  convertUnitToBytes(value: any, unit: string) {
    value = +value;
    if (unit === 'GB') {
      return value * this.GB;
    } else if (unit === 'MB') {
      return value * this.MB;
    } else if (unit === 'KB') {
      return value * this.KB;
    } else {
      return value;
    }
  }

  convertByteToUnit(bytes: any): { value: number; unit: string } {
    bytes = +bytes;
    let value: number;
    let unit: string;
    if (bytes < this.KB) {
      value = bytes;
      if (value <= 1) {
        unit = 'Byte';
      } else {
        unit = 'Bytes';
      }
    } else if (bytes >= this.KB && bytes < this.MB) {
      value = bytes / this.KB;
      unit = 'KB';
    } else if (bytes >= this.MB && bytes < this.GB) {
      value = bytes / this.MB;
      unit = 'MB';
    } else {
      value = bytes / this.GB;
      unit = 'GB';
    }
    return { value, unit };
  }
}
