import { RoleService } from './../services/role.service';
import { NbMenuItem } from '@nebular/theme';
import { Injectable } from '@angular/core';
import { MENU_ITEMS } from './employee-menu';

@Injectable()
export class MenuService {
  private menuItems: NbMenuItem[] = [];
  private role: string;

  getMenuItems() {
    return this.menuItems;
  }

  constructor(private roleService: RoleService) {
    roleService.getEmployeeRole().subscribe((role: string) => {
      this.role = role;
    });
  }

  setMenuItemSequence() {
    this.menuItems = [];
    this.menuItems.push(MENU_ITEMS[0]); // home
    this.menuItems.push(MENU_ITEMS[1]); // dashboard
    this.menuItems.push(MENU_ITEMS[2]); // My Salaries
    this.menuItems.push(MENU_ITEMS[3]); // My Leaves
    this.menuItems.push(MENU_ITEMS[4]); // branch management
    this.menuItems.push(MENU_ITEMS[5]); // student management
    this.menuItems.push(MENU_ITEMS[6]); // schedule management
    this.menuItems.push(MENU_ITEMS[7]); // lecture management
    this.menuItems.push(MENU_ITEMS[8]); // assignment management
    this.menuItems.push(MENU_ITEMS[9]); // exam management
    this.menuItems.push(MENU_ITEMS[10]); // employee management
    this.menuItems.push(MENU_ITEMS[11]); // Leave management
    this.menuItems.push(MENU_ITEMS[12]); // lead management
    this.menuItems.push(MENU_ITEMS[13]); // students report
    this.menuItems.push(MENU_ITEMS[14]); // budget managements
  }

  showHideMenu(i: number, status: boolean) {
    const menuItem = MENU_ITEMS[i];
    menuItem.hidden = status;
    if (menuItem.children) {
      MENU_ITEMS[i].children.map((menuItemChildren: NbMenuItem) => {
        menuItemChildren.hidden = status;
      });
    }
  }

  hideMenus() {
    this.menuItems = MENU_ITEMS.map((menuItem: NbMenuItem, i: number) => {
      if (i !== 0) {
        menuItem.hidden = true;
        if (menuItem.children) {
          menuItem.children.map((menuItemChildren: NbMenuItem) => {
            menuItemChildren.hidden = true;
          });
        }
        return menuItem;
      }
    });
  }

  showMenus() {
    this.showHideMenu(0, false);
    if (this.role) {
      this.showHideMenu(1, false);
    }
    if (this.role === 'manager') {
      this.showHideMenu(2, false);
      this.showHideMenu(3, false);
      this.showHideMenu(4, false);
      this.showHideMenu(5, false);
      this.showHideMenu(6, false);
      this.showHideMenu(7, false);
      this.showHideMenu(8, false);
      this.showHideMenu(9, false);
      this.showHideMenu(10, false);
      this.showHideMenu(11, false);
      this.showHideMenu(12, false);
      this.showHideMenu(13, false);
      this.showHideMenu(14, false);
    } else if (this.role === 'teacher') {
      this.showHideMenu(2, false);
      this.showHideMenu(3, false);
      this.showHideMenu(4, true);
      this.showHideMenu(5, true);
      this.showHideMenu(6, false);
      this.showHideMenu(7, false);
      this.showHideMenu(8, false);
      this.showHideMenu(9, false);
      this.showHideMenu(10, true);
      this.showHideMenu(11, true);
      this.showHideMenu(12, true);
      this.showHideMenu(13, false);
      this.showHideMenu(14, true);
    } else if (this.role === 'councillor') {
      this.showHideMenu(2, false);
      this.showHideMenu(3, false);
      this.showHideMenu(4, true);
      this.showHideMenu(5, true);
      this.showHideMenu(6, true);
      this.showHideMenu(7, true);
      this.showHideMenu(8, true);
      this.showHideMenu(9, true);
      this.showHideMenu(10, true);
      this.showHideMenu(11, true);
      this.showHideMenu(12, false);
      this.showHideMenu(13, false);
      this.showHideMenu(14, true);
    } else {
      this.hideMenus();
    }
  }
}
