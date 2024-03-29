import { EmployeeService } from './../../../../services/employee.service';
import { BranchEmployeeService } from '../../../../services/branch-employee.service';
import { BranchEmployeeModel } from '../../../../models/branch-employee.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';

@Component({
  selector: 'ngx-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss'],
})
export class ManageEmployeeComponent implements OnInit {
  loading: boolean;
  private branchId: string;
  type: string;
  branchEmployees: BranchEmployeeModel[];
  constructor(
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private branchEmployeeService: BranchEmployeeService,

    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      // put the code from `ngOnInit` here
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.route.queryParams.subscribe((param: Params) => {
      this.type = param.type;
    });

    if (this.type !== 'active' && this.type !== 'inactive') {
      this.router.navigate(['../manage'], {
        relativeTo: this.route,
        queryParams: { type: 'active' },
      });
      return;
    }

    this.employeeService.setEmployeeType(this.type);

    this.branchEmployees = [];

    this.branchEmployeeService.getBranchEmployeeNameIds(this.branchId, this.type).subscribe(
      (branchEmployees: BranchEmployeeModel[]) => {
        this.branchEmployees = branchEmployees;
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      },
    );
  }

  editBranchEmployee(id: string, employee: string) {
    this.employeeService.setEmployeeId(employee);
    this.branchEmployeeService.setBranchEmployeeId(id);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  branchEmployeeSalary(branchEmployee: BranchEmployeeModel) {
    this.branchEmployeeService.setBranchEmployeeData(branchEmployee);
    this.router.navigate(['../salary'], { relativeTo: this.route });
  }
  d;

  changeBranchEmployeeStatus(id: string, status: boolean, i: number) {
    this.branchEmployeeService.changeBranchEmployeeStatus(id, status).subscribe(
      (res: any) => {
        this.branchEmployees.splice(i, 1);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      },
    );
  }
}
