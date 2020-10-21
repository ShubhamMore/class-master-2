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
    title: 'Institutes',
    icon: '',
    link: '/admin/institutes',
    hidden: false,
  },

  // 3
  {
    title: 'Membership Plans',
    icon: '',
    link: '/admin/membership',
    hidden: false,
  },

  // 4
  {
    title: 'Coupon Codes',
    icon: '',
    link: '/admin/coupon',
    hidden: false,
  },

  // 5
  {
    title: 'IMS Ids',
    icon: '',
    link: '/admin/ims-ids',
    hidden: false,
  },
];
