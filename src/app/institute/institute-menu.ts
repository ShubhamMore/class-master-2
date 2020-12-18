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
    icon: 'cube-outline',
    link: '/institute/my-institutes',
    hidden: false,
  },

  // 3
  {
    title: 'Dashboard',
    icon: 'shield-outline',
    link: '/institute/branch/dashboard',
    hidden: true,
  },

  // 4
  {
    title: 'Branch Management',
    icon: 'share-outline',
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
    icon: 'person-outline',
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
    icon: 'calendar-outline',
    link: '/institute/branch/schedule/batch',
    hidden: true,
  },

  // 7
  {
    title: 'Lecture Management',
    icon: 'book-open-outline',
    link: '/institute/branch/lecture/batch',
    hidden: true,
  },

  // 8
  {
    title: 'Assignment Management',
    icon: 'archive-outline',
    link: '/institute/branch/assignment/batch',
    hidden: true,
  },

  // 9
  {
    title: 'Exam Management',
    icon: 'edit-2-outline',
    hidden: true,
    children: [
      {
        title: 'Schedule Classroom Test',
        link: '/institute/branch/exam/test/batch',
        hidden: true,
      },
      {
        title: 'Schedule Online Exam',
        link: '/institute/branch/exam/online-test/batch',
        hidden: true,
      },
    ],
  },

  // 10
  {
    title: 'Employee Management',
    icon: 'people-outline',
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

  // 11
  {
    title: 'Leave Management',
    icon: 'log-out-outline',
    link: '/institute/branch/leave',
    hidden: true,
  },

  // 12
  {
    title: 'Lead Management',
    icon: 'search-outline',
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

  // 13
  {
    title: 'Student Reports',
    icon: 'bar-chart-outline',
    link: '/institute/branch/students-report',
    hidden: true,
  },

  // 14
  {
    title: 'Budget Management',
    icon: 'activity-outline',
    link: '/institute/branch/budget/manage',
    // badge: {
    //   text: '30',
    //   status: 'primary',
    // },
    hidden: true,
  },
];
