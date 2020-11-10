import { BatchModel } from './../../../../models/batch.model';
import { CourseModel } from './../../../../models/course.model';
import { CourseService } from './../../../../services/course.service';
import { BatchService } from './../../../../services/batch.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.scss'],
})
export class OnlineTestComponent implements OnInit, OnDestroy {
  loading: boolean;
  private branchId: string;

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

    this.courseService.getCourses(this.branchId, '').subscribe(
      (courses: CourseModel[]) => {
        this.courseService.setCoursesData(courses);
        this.loading = false;
      },
      (error: any) => {},
    );

    this.batchService.getBatches(this.branchId, '', '').subscribe(
      (batches: BatchModel[]) => {
        this.batchService.setBatchesData(batches);
      },
      (error: any) => {},
    );
  }

  ngOnDestroy() {
    this.courseService.deleteCoursesData();
    this.batchService.deleteBatchesData();
  }
}
