import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

interface User {
  name: string;
  email: string;
  phone: string;
  imsMasterId: string;
  status: boolean;
}
@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  loading: boolean;

  institutes: User[];
  employees: User[];
  students: User[];

  institute: string;
  employee: string;
  student: string;

  curTab: string;

  filteredInstitutes: User[];
  filteredEmployees: User[];
  filteredStudents: User[];

  constructor(private userService: UserService, private toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.loading = true;

    this.institutes = [];
    this.employees = [];
    this.students = [];

    this.filteredInstitutes = [];
    this.filteredEmployees = [];
    this.filteredStudents = [];

    this.curTab = 'institutes';

    this.userService.getUsers().subscribe(
      (users: any) => {
        this.institutes = users.institutes;
        this.employees = users.employees;
        this.students = users.students;

        this.filteredInstitutes = [...this.institutes];
        this.filteredEmployees = [...this.employees];
        this.filteredStudents = [...this.students];

        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  changeTab(tab: string) {
    this.curTab = tab;
  }

  searchInstitute(institute: string) {
    this.institute = institute ? institute.trim().toLowerCase() : null;
    if (this.institute) {
      this.filteredInstitutes = this.institutes.filter((curInstitute: User) =>
        curInstitute.name.toLowerCase().includes(this.institute),
      );
    } else {
      this.filteredInstitutes = [...this.institutes];
    }
  }

  searchEmployee(employee: string) {
    this.employee = employee ? employee.trim().toLowerCase() : null;
    if (this.employee) {
      this.filteredEmployees = this.employees.filter((curEmployee: User) =>
        curEmployee.name.toLowerCase().includes(this.employee),
      );
    } else {
      this.filteredEmployees = [...this.employees];
    }
  }

  searchStudent(student: string) {
    this.student = student ? student.trim().toLowerCase() : null;
    if (this.student) {
      this.filteredStudents = this.students.filter((curStudent: User) =>
        curStudent.name.toLowerCase().includes(this.student),
      );
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  changeUserStatus(userRole: string, user: string, status: boolean) {
    this.loading = true;

    this.userService.changeUserStatus(user, status).subscribe(
      (res: any) => {
        if (userRole === 'institute') {
          const index = this.institutes.findIndex(
            (institute: User) => institute.imsMasterId === user,
          );
          if (index >= 0) {
            this.institutes[index].status = status;
          }
          this.searchInstitute(this.institute);
        } else if (userRole === 'employee') {
          const index = this.employees.findIndex((employee: User) => employee.imsMasterId === user);
          if (index >= 0) {
            this.employees[index].status = status;
          }
          this.searchInstitute(this.employee);
        } else if (userRole === 'student') {
          const index = this.students.findIndex((student: User) => student.imsMasterId === user);
          if (index >= 0) {
            this.students[index].status = status;
          }
          this.searchInstitute(this.student);
        } else {
          this.showToastr('top-right', 'danger', 'Invalid User Role');
        }
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
