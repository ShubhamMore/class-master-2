import { EmployeeNameIdModel } from './../../../../models/branch-employee.model';
import { BranchEmployeeService } from './../../../../services/branch-employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from './../../../../services/batch.service';
import { CourseService } from './../../../../services/course.service';
import { BranchService } from './../../../../services/branch.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-batch-schedule',
  templateUrl: './batch-schedule.component.html',
  styleUrls: ['./batch-schedule.component.scss'],
})
export class BatchScheduleComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private batchService: BatchService,
    private router: Router,
    private route: ActivatedRoute,
    private branchEmployeeService: BranchEmployeeService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.branchEmployeeService.getBranchEmployeeNameIdsForBatch(this.branchId, 'teacher').subscribe(
      (employees: EmployeeNameIdModel[]) => {
        this.branchEmployeeService.setBranchEmployeeNameIdsData(employees);
        this.loading = false;
      },
      (error: any) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
    );
  }

  ngOnDestroy() {
    // this.branchService.deleteCategoryId();
    // this.branchService.deleteCategoryData();

    this.courseService.deleteCourseId();
    this.courseService.deleteCourseData();

    this.batchService.deleteBatchId();
    this.batchService.deleteBatchData();

    this.branchEmployeeService.deleteBranchEmployeeNameIdsData();
  }
}
