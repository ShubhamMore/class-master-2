import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private userRoles: string[];
  private employeeRoles: string[];

  constructor() {
    this.userRoles = ['institute', 'employee', 'student'];
    this.employeeRoles = ['manager', 'teacher', 'councillor'];
  }

  getUserRoles() {
    return this.userRoles;
  }

  getEmployeeRoles() {
    return this.employeeRoles;
  }
}
