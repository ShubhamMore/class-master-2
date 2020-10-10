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
    title: 'Class Schedule',
    icon: 'calendar-outline',
    link: '/student/branch/schedule/manage',
    hidden: true,
  },

  // 5
  {
    title: 'Lecture',
    icon: 'book-open-outline',
    link: '/student/branch/lecture/manage',
    hidden: true,
  },

  // 6
  {
    title: 'Exam',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Schedule Classroom Test',
        link: '/student/branch/exam/test/manage',
        hidden: true,
      },
      {
        title: 'Schedule Online Exam',
        link: '/student/branch/exam/online-test/manage',
        hidden: true,
      },
    ],
  },
];
