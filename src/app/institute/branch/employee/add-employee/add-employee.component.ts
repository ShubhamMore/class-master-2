import { EmployeeBranchService } from './../../../../services/employee-branch.service';
import { EmployeeService } from './../../../../services/employee.service';
import { FormGroup } from '@angular/forms';
import { EmployeeModel } from './../../../../models/employee.model';
import { EmployeeBranchModel } from './../../../../models/employee-branch.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  loading: boolean;
  private branchId: string;
  private employeeId: string;
  private employeeBranchId: string;
  employee: EmployeeModel;
  employeeBranch: EmployeeBranchModel;
  employeeBranchForm: FormGroup;
  constructor(
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private employeeBranchService: EmployeeBranchService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.location.back();
      return;
    }
  }
}
