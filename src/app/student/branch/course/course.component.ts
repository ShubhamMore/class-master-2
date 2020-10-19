import { NbToastrService } from '@nebular/theme';
import { BranchService } from './../../../services/branch.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
  private branchId: string;

  constructor(
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.branchId = this.branchService.getBranchId();

    if (!this.branchId) {
      this.back();

      this.showToastr('top-right', 'danger', 'Student Details Not Available');
      return;
    }
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  private back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
