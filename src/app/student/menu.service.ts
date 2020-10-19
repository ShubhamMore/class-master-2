import { NbMenuItem } from '@nebular/theme';
import { Injectable } from '@angular/core';
import { MENU_ITEMS } from './student-menu';

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
  }

  hideMenu() {
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

  showMenu() {
    this.menuItems = MENU_ITEMS.map((menuItem: NbMenuItem, i: number) => {
      menuItem.hidden = false;
      if (menuItem.children) {
        menuItem.children.map((menuItemChildren: NbMenuItem) => {
          menuItemChildren.hidden = false;
        });
      }
      return menuItem;
    });
  }
}
