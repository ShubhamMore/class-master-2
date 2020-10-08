import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private userRoles: string[];
  private employeeRoles: string[];
  private employeeRole = new BehaviorSubject<string>(null);

  constructor() {
    this.userRoles = ['institute', 'employee', 'student'];
    this.employeeRoles = ['manager', 'teacher', 'councillor'];
  }

  getUserRoles() {
    return this.userRoles;
  }

  setEmployeeRole(role: string) {
    this.employeeRole.next(role);
  }

  getEmployeeRole() {
    return this.employeeRole;
  }

  getEmployeeRoles() {
    return this.employeeRoles;
  }
}
