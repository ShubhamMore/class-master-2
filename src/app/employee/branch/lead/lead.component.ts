import { LeadService } from './../../../services/lead.service';
import { CourseModel } from '../../../models/course.model';
import { CourseService } from './../../../services/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
})
export class LeadComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private leadService: LeadService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.courseService.getCourses(this.branchId, '').subscribe(
      (courses: CourseModel[]) => {
        this.courseService.setCoursesData(courses);
        this.loading = false;
      },
      (err: any) => {
        this.back();
        return;
      },
    );
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.courseService.deleteCoursesData();
    this.leadService.deleteLeadType();
  }
}
