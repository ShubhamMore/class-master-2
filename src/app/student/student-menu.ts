import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // 1
  {
    title: 'Home',
    icon: 'home',
    link: '/student/home',
    home: true,
    hidden: false,
  },

  // 2
  {
    title: 'Dashboard',
    icon: '',
    link: '/student/branch/dashboard',
    hidden: true,
  },

  // 3
  {
    title: 'My Course',
    icon: '',
    link: '/student/branch/course/manage',
    hidden: true,
  },

  // 4
  {
    title: 'Exam',
    icon: '',
    link: '/student/branch/exam/online-test/manage',
    hidden: true,
  },
];
