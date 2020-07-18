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
    title: 'My Institutes',
    icon: '',
    link: '/institute/my-institutes',
    hidden: false,
  },

  // 3
  {
    title: 'Dashboard',
    icon: '',
    link: '/institute/branch/dashboard',
    hidden: true,
  },

  // 4
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

  // 5
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

  // 6
  {
    title: 'Schedule Class',
    icon: '',
    link: '/institute/branch/schedule/manage',
    hidden: true,
  },

  // 7
  {
    title: 'Student Attendance',
    icon: '',
    link: '/institute/branch/attendance/manage',
    hidden: true,
  },

  // 8
  {
    title: 'Exam Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Schedule Classroom Test',
        link: '/institute/branch/exam/test/manage',
        hidden: true,
      },
      {
        title: 'Schedule Online Exam',
        link: '/institute/branch/exam/online-test/manage',
        hidden: true,
      },
    ],
  },

  // 9
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

  // 10
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
        link: '/institute/branch/lead/manage/active',
        hidden: true,
      },
      {
        title: 'Close Leads',
        link: '/institute/branch/lead/manage/inactive',
        hidden: true,
      },
    ],
  },

  // 11
  {
    title: 'Budget Management',
    icon: '',
    link: '/institute/branch/budget/manage',
    hidden: true,
  },
];
