import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // 1
  {
    title: 'Home',
    icon: 'home',
    link: '/institute/home',
    home: true,
    hidden: false,
  },

  // 2
  {
    title: 'Dashboard',
    icon: '',
    link: '/institute/branch/dashboard',
    hidden: true,
  },

  // 3
  {
    title: 'Branch Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Receipt Details',
        link: '/institute/branch/manage-branch/receipt',
        hidden: true,
      },
      {
        title: 'Course',
        link: '/institute/branch/manage-branch/course',
        hidden: true,
      },
      {
        title: 'Discount & Offers',
        link: '/institute/branch/manage-branch/discount-and-offers',
        hidden: true,
      },
    ],
  },

  // 4
  {
    title: 'Student Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Add Student',
        link: '/institute/branch/student/add',
        hidden: true,
      },
      {
        title: 'Active Students',
        link: '/institute/branch/student/manage',
        queryParams: { type: 'active' },
        hidden: true,
      },
      {
        title: 'Inactive Students',
        link: '/institute/branch/student/manage',
        queryParams: { type: 'inactive' },
        hidden: true,
      },
    ],
  },

  // 5
  {
    title: 'Schedule Class',
    icon: 'calendar-outline',
    link: '/institute/branch/schedule/batch',
    hidden: true,
  },

  // 6
  {
    title: 'Lecture Management',
    icon: 'book-open-outline',
    link: '/institute/branch/lecture/batch',
    hidden: true,
  },

  // 7
  {
    title: 'Exam Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Schedule Classroom Test',
        link: '/institute/branch/exam/test/batch',
        hidden: true,
      },
      {
        title: 'Schedule Online Exam',
        link: '/institute/branch/exam/online-test/manage',
        hidden: true,
      },
    ],
  },

  // 8
  {
    title: 'Employee Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Add Employee',
        link: '/institute/branch/employee/add',
        hidden: true,
      },
      {
        title: 'Active Employees',
        link: '/institute/branch/employee/manage',
        queryParams: { type: 'active' },
        hidden: true,
      },
      {
        title: 'Inactive Employees',
        link: '/institute/branch/employee/manage',
        queryParams: { type: 'inactive' },
        hidden: true,
      },
    ],
  },

  // 9
  {
    title: 'Lead Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Add Lead',
        link: '/institute/branch/lead/add',
        hidden: true,
      },
      {
        title: 'Active Leads',
        link: '/institute/branch/lead/manage',
        queryParams: { type: 'active' },
      },
      {
        title: 'Close Leads',
        link: '/institute/branch/lead/manage',
        queryParams: { type: 'inactive' },
      },
    ],
  },

  // 10
  {
    title: 'Budget Management',
    icon: '',
    link: '/institute/branch/budget/manage',
    hidden: true,
  },
];
