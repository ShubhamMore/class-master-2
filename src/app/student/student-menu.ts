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
    queryParams: { type: 'course' },
  },

  // 4
  {
    title: 'Lecture',
    icon: '',
    link: '/student/branch/course/manage',
    hidden: true,
    queryParams: { type: 'lecture' },
  },

  // 5
  {
    title: 'Assignment',
    icon: '',
    link: '/student/branch/course/manage',
    hidden: true,
    queryParams: { type: 'assignment' },
  },

  // 6
  {
    title: 'Report',
    icon: '',
    link: '/student/branch/course/manage',
    hidden: true,
    queryParams: { type: 'report' },
  },

  // 7
  {
    title: 'Online Exam',
    icon: '',
    link: '/student/branch/exam/online-test/manage',
    hidden: true,
  },
];
