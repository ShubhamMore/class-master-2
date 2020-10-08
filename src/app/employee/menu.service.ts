import { NbMenuItem } from '@nebular/theme';
import { Injectable } from '@angular/core';
import { MENU_ITEMS } from './employee-menu';

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
    this.menuItems.push(MENU_ITEMS[6]);
    this.menuItems.push(MENU_ITEMS[7]);
    this.menuItems.push(MENU_ITEMS[8]);
    this.menuItems.push(MENU_ITEMS[9]);
  }

  hideMenu() {
    this.menuItems = MENU_ITEMS.map((menuItem: NbMenuItem, i: number) => {
      if (i !== 0 && i !== 1) {
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
