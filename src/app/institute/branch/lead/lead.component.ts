import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
})
export class LeadComponent implements OnInit {
  loading: boolean;
  branchId: string;

  constructor(
    private branchService: BranchService,

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
}
