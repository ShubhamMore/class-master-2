import { NbMenuItem } from '@nebular/theme';
import { MenuService } from './menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-employee',
  styleUrls: ['./employee.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class EmployeeComponent implements OnInit {
  menu: NbMenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.setMenuItemSequence();
    this.menu = this.menuService.getMenuItems();
  }
}
