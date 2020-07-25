import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
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
    this.loading = false;
  }
}
