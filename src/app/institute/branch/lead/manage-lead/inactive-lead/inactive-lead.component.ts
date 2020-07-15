import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from './../../../../../services/branch.service';
import { Location } from '@angular/common';
@Component({
  selector: 'ngx-inactive-lead',
  templateUrl: './inactive-lead.component.html',
  styleUrls: ['./inactive-lead.component.scss'],
})
export class InactiveLeadComponent implements OnInit {
  loading: boolean;
  branchId: string;

  constructor(
    private branchService: BranchService,
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
