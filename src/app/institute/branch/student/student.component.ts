import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../services/branch.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  loading: boolean;
  branchId: string;

  constructor(private branchService: BranchService, private location: Location) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.location.back();
      return;
    }
  }
}
