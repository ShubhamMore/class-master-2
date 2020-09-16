import { NbToastrService } from '@nebular/theme';
import { BranchEmployeeModel } from './../../../../models/branch-employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';
import { BranchEmployeeService } from './../../../../services/branch-employee.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'ngx-manage-employee-salary',
  templateUrl: './manage-employee-salary.component.html',
  styleUrls: ['./manage-employee-salary.component.scss'],
})
export class ManageEmployeeSalaryComponent implements OnInit, OnDestroy {
  loading: boolean;

  constructor(
    private employeeService: EmployeeService,
    private branchEmployeeService: BranchEmployeeService,
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    const branchId = this.branchService.getBranchId();
    if (!branchId) {
      this.back();
      return;
    }

    this.branchEmployeeService
      .getBranchEmployeeData()
      .subscribe((branchEmployee: BranchEmployeeModel) => {
        if (!branchEmployee) {
          this.showToastr('top-right', 'danger', 'Branch Employee Not Found');
          this.back();
          return;
        }

        this.employeeService.getEmployeeByIMSId(branchEmployee.employee).subscribe(
          (employee: any) => {
            this.employeeService.setEmployeeData(employee);
            this.loading = false;
          },
          (err: any) => {
            this.showToastr('top-right', 'danger', err);
            this.back();
          },
        );
      });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    const type = this.employeeService.getEmployeeType();
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: { type } });
  }

  ngOnDestroy() {
    this.employeeService.deleteEmployeeData();
  }
}
