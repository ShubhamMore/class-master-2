import { LectureMaterialModel } from './../../../../../../models/lecture-material.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LectureMaterialService } from './../../../../../../services/lecture-material.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-view-study-material',
  templateUrl: './view-study-material.component.html',
  styleUrls: ['./view-study-material.component.scss'],
})
export class ViewStudyMaterialComponent implements OnInit, OnDestroy {
  loading: boolean;
  lectureMaterialId: string;
  lectureMaterial: LectureMaterialModel;

  constructor(
    private lectureMaterialService: LectureMaterialService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.lectureMaterialId = this.lectureMaterialService.getLectureMaterialId();
    if (!this.lectureMaterialId) {
      this.showToastr('top-right', 'danger', 'Invalid Lecture Material Id');
      this.back();
      return;
    }

    this.lectureMaterialService
      .getLectureMaterialData()
      .subscribe((lectureMaterial: LectureMaterialModel) => {
        if (!lectureMaterial) {
          this.back();
          return;
        }
        this.lectureMaterial = lectureMaterial;
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
    // this.lectureMaterialService.deleteLectureMaterialId();
    // this.lectureMaterialService.deleteLectureMaterialData();
  }
}
