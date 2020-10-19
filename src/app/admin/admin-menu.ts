import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // 1
  {
    title: 'Home',
    icon: 'home',
    link: '/admin/home',
    home: true,
    hidden: false,
  },

  // 2
  {
    title: 'Dashboard',
    icon: '',
    link: '/admin/branch/dashboard',
    hidden: false,
  },

  // 3
  {
    title: 'Institutes',
    icon: '',
    link: '/admin/institute',
    hidden: false,
  },

  // 4
  {
    title: 'Membership Plans',
    icon: 'calendar-outline',
    link: '/admin/membership',
    hidden: false,
  },

  // 5
  {
    title: 'Coupon Codes',
    icon: 'book-open-outline',
    link: '/admin/coupons',
    hidden: false,
  },

  // 6
  {
    title: 'IMS Ids',
    icon: '',
    link: '/admin/ims-ids',
    hidden: false,
  },
];
