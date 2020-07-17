import { CourseService } from './../../../../../../services/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from './../../../../../../services/branch.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
})
export class BatchComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
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

    const course = this.courseService.getCourseData();
    if (!course) {
      this.location.back();
      return;
    }
  }

  ngOnDestroy() {
    this.courseService.deleteCourseData();
  }
}
