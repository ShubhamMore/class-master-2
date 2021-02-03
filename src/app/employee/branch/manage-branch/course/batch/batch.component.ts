import { CourseService } from './../../../../../services/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
})
export class BatchComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;
  courseId: string;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,

    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.courseId = this.courseService.getCourseId();
    if (!this.branchId || !this.courseId) {
      this.back();
      return;
    }

    const course = this.courseService.getCourseData();
    if (!course) {
      this.back();
      return;
    }
    this.loading = false;
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.courseService.deleteCourseId();
    this.courseService.deleteCourseData();
  }
}
