import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.scss'],
})
export class ManageScheduleComponent implements OnInit {
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
