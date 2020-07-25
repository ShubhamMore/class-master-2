import { CourseMaterialModel } from './../../../../../../models/course-material.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseMaterialService } from './../../../../../../services/course-material.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-view-course-material',
  templateUrl: './view-course-material.component.html',
  styleUrls: ['./view-course-material.component.scss'],
})
export class ViewCourseMaterialComponent implements OnInit, OnDestroy {
  loading: boolean;
  courseMaterialId: string;
  courseMaterial: CourseMaterialModel;

  constructor(
    private courseMaterialService: CourseMaterialService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.courseMaterialId = this.courseMaterialService.getCourseMaterialId();
    if (!this.courseMaterialId) {
      this.showToastr('top-right', 'danger', 'Invalid Course Material Id');
      this.back();
      return;
    }

    this.courseMaterialService
      .getCourseMaterialData()
      .subscribe((courseMaterial: CourseMaterialModel) => {
        if (!courseMaterial) {
          this.back();
          return;
        }
        this.courseMaterial = courseMaterial;
        this.loading = false;
      });
  }

  back() {
    this.loading = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.courseMaterialService.deleteCourseMaterialId();
    this.courseMaterialService.deleteCourseMaterialData();
  }
}
