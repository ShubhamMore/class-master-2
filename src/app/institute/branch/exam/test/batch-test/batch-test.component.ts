import { BatchService } from './../../../../../services/batch.service';
import { CourseService } from './../../../../../services/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-batch-test',
  templateUrl: './batch-test.component.html',
  styleUrls: ['./batch-test.component.scss'],
})
export class BatchTestComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private batchService: BatchService,
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
    this.branchService.deleteCategoryId();
    this.branchService.deleteCategoryData();

    this.courseService.deleteCourseId();
    this.courseService.deleteCourseData();

    this.batchService.deleteBatchId();
    this.batchService.deleteBatchData();
  }
}
