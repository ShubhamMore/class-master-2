import { NbMenuItem } from '@nebular/theme';
import { Injectable } from '@angular/core';
import { MENU_ITEMS } from './admin-menu';

@Injectable()
export class MenuService {
  private menuItems: NbMenuItem[] = [];

  getMenuItems() {
    return this.menuItems;
  }

  constructor() {}

  setMenuItemSequence() {
    this.menuItems = [];
    this.menuItems.push(MENU_ITEMS[0]);
    this.menuItems.push(MENU_ITEMS[1]);
    this.menuItems.push(MENU_ITEMS[2]);
    this.menuItems.push(MENU_ITEMS[3]);
    this.menuItems.push(MENU_ITEMS[4]);
    this.menuItems.push(MENU_ITEMS[5]);
  }
}
