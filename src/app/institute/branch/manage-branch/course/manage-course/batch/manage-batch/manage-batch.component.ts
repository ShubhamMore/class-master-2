import { CourseModel } from './../../../../../../../models/course.model';
import { CourseService } from './../../../../../../../services/course.service';
import { BatchService } from './../../../../../../../services/batch.service';
import { BranchService } from './../../../../../../../services/branch.service';
import { BatchModel } from './../../../../../../../models/batch.model';
import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'ngx-manage-batch',
  templateUrl: './manage-batch.component.html',
  styleUrls: ['./manage-batch.component.scss'],
})
export class ManageBatchComponent implements OnInit {
  loading: boolean;
  branchId: string;
  course: CourseModel;
  batches: BatchModel[];

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private batchService: BatchService,
    private toastrService: NbToastrService,
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

    this.course = this.courseService.getCourseData();
    if (!this.course) {
      this.location.back();
      return;
    }

    this.batches = [];

    this.getBatches();
  }

  getBatches() {
    this.loading = true;
    this.batchService
      .getBatches(this.branchId, this.course.basicDetails.category, this.course._id)
      .subscribe(
        (batches: BatchModel[]) => {
          this.batches = batches;
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
        },
      );
  }

  addBatch() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  editBatch(id: string) {
    this.batchService.setBatchId(id);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  changeBatchStatus(id: string, status: boolean, i: number) {
    this.loading = true;
    this.batchService.changeBatchStatus(id, status).subscribe(
      (res: any) => {
        this.batches[i].status = status;
        this.showToastr(
          'top-right',
          'success',
          `Batch ${status ? 'Activated' : 'Deactivated'} Successfully!`,
        );
        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
