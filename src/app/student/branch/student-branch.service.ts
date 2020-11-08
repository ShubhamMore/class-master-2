import { Injectable } from '@angular/core';

@Injectable()
export class StudentBranchService {
  private type: string;

  setType(type: string) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  constructor() {}
}
