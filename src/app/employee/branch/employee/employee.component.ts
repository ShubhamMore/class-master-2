import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  constructor(
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }
  }

  ngOnDestroy() {
    // this.employeeService.deleteEmployeeType();
  }
}
