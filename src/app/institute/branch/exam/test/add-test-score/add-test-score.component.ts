import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-add-test-score',
  templateUrl: './add-test-score.component.html',
  styleUrls: ['./add-test-score.component.scss'],
})
export class AddTestScoreComponent implements OnInit {
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
