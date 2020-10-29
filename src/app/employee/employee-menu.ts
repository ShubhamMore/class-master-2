import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // 1
  {
    title: 'Home',
    icon: 'home',
    link: '/employee/home',
    home: true,
    hidden: false,
  },

  // 2
  {
    title: 'Dashboard',
    icon: '',
    link: '/employee/branch/dashboard',
    hidden: true,
  },

  // 3
  {
    title: 'My Salaries',
    icon: '',
    link: '/employee/branch/my-salary/manage',
    hidden: true,
  },

  // 4
  {
    title: 'My Leaves',
    icon: '',
    link: '/employee/branch/my-leave',
    hidden: true,
  },

  // 5
  {
    title: 'Branch Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Receipt Details',
        link: '/employee/branch/manage-branch/receipt',
        hidden: true,
      },
      {
        title: 'Course',
        link: '/employee/branch/manage-branch/course',
        hidden: true,
      },
      {
        title: 'Discount & Offers',
        link: '/employee/branch/manage-branch/discount-and-offers',
        hidden: true,
      },
    ],
  },

  // 6
  {
    title: 'Student Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Add Student',
        link: '/employee/branch/student/add',
        hidden: true,
      },
      {
        title: 'Active Students',
        link: '/employee/branch/student/manage',
        queryParams: { type: 'active' },
        hidden: true,
      },
      {
        title: 'Inactive Students',
        link: '/employee/branch/student/manage',
        queryParams: { type: 'inactive' },
        hidden: true,
      },
    ],
  },

  // 7
  {
    title: 'Schedule Class',
    icon: 'calendar-outline',
    link: '/employee/branch/schedule/batch',
    hidden: true,
  },

  // 8
  {
    title: 'Lecture Management',
    icon: 'book-open-outline',
    link: '/employee/branch/lecture/batch',
    hidden: true,
  },

  // 9
  {
    title: 'Exam Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Schedule Classroom Test',
        link: '/employee/branch/exam/test/batch',
        hidden: true,
      },
      {
        title: 'Schedule Online Exam',
        link: '/employee/branch/exam/online-test/manage',
        hidden: true,
      },
    ],
  },

  // 10
  {
    title: 'Employee Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Add Employee',
        link: '/employee/branch/employee/add',
        hidden: true,
      },
      {
        title: 'Active Employees',
        link: '/employee/branch/employee/manage',
        queryParams: { type: 'active' },
        hidden: true,
      },
      {
        title: 'Inactive Employees',
        link: '/employee/branch/employee/manage',
        queryParams: { type: 'inactive' },
        hidden: true,
      },
    ],
  },

  // 11
  {
    title: 'Leave Management',
    icon: '',
    link: '/employee/branch/leave',
    hidden: true,
  },

  // 12
  {
    title: 'Lead Management',
    icon: '',
    hidden: true,
    children: [
      {
        title: 'Add Lead',
        link: '/employee/branch/lead/add',
        hidden: true,
      },
      {
        title: 'Active Leads',
        link: '/employee/branch/lead/manage',
        queryParams: { type: 'active' },
      },
      {
        title: 'Close Leads',
        link: '/employee/branch/lead/manage',
        queryParams: { type: 'inactive' },
      },
    ],
  },

  // 13
  {
    title: 'Students Report',
    icon: '',
    link: '/employee/branch/students-report',
    hidden: true,
  },

  // 14
  {
    title: 'Budget Management',
    icon: '',
    link: '/employee/branch/budget/manage',
    hidden: true,
  },
];
