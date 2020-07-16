import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roles: string[];

  constructor() {
    this.roles = ['manager', 'teacher', 'councillor'];
  }

  getRoles() {
    return this.roles;
  }
}
