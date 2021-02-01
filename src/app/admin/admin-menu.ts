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
    icon: 'layers-outline',
    link: '/admin/institutes',
    hidden: false,
  },

  // 3
  {
    title: 'Membership Plans',
    icon: 'pricetags-outline',
    link: '/admin/membership-plans',
    hidden: false,
  },

  // 4
  {
    title: 'SMS Packages',
    icon: 'message-circle-outline',
    link: '/admin/sms-packages',
    hidden: false,
  },

  // 5
  {
    title: 'Storage Packages',
    icon: 'hard-drive-outline',
    link: '/admin/storage-packages',
    hidden: false,
  },

  // 6
  {
    title: 'Coupon Codes',
    icon: 'credit-card-outline',
    link: '/admin/coupon',
    hidden: false,
  },

  // 7
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/admin/users',
    hidden: false,
  },

  // 8
  {
    title: 'Setting',
    icon: 'settings-2-outline',
    link: '/admin/settings',
    hidden: false,
  },
];
