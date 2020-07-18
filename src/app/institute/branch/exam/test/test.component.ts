import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
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
