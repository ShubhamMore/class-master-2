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
    icon: 'shield-outline',
    link: '/student/branch/dashboard',
    hidden: true,
  },

  // 3
  {
    title: 'My Courses',
    icon: 'share-outline',
    link: '/student/branch/course/manage',
    hidden: true,
    queryParams: { type: 'course' },
  },

  // 4
  {
    title: 'Lectures',
    icon: 'book-open-outline',
    link: '/student/branch/course/manage',
    hidden: true,
    queryParams: { type: 'lecture' },
  },

  // 5
  {
    title: 'Assignments',
    icon: 'archive-outline',
    link: '/student/branch/course/manage',
    hidden: true,
    queryParams: { type: 'assignment' },
  },

  // 6
  {
    title: 'Reports',
    icon: 'bar-chart-outline',
    link: '/student/branch/course/manage',
    hidden: true,
    queryParams: { type: 'report' },
  },

  // 7
  {
    title: 'Online Exams',
    icon: 'edit-2-outline',
    link: '/student/branch/course/manage',
    hidden: true,
    queryParams: { type: 'exam' },
  },
];
