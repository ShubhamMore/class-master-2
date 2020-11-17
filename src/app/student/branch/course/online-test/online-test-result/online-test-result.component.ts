import { OnlineExamResultModel } from './../../../../../models/online-exam-result.model';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineExamModel } from './../../../../../models/online-exam.model';
import { OnlineExamService } from './../../../../../services/online-exam.service';
import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'ngx-online-test-result',
  templateUrl: './online-test-result.component.html',
  styleUrls: ['./online-test-result.component.scss'],
})
export class OnlineTestResultComponent implements OnInit {
  loading: boolean;

  onlineExam: OnlineExamModel;
  onlineExamResult: any;
  constructor(
    private onlineExamService: OnlineExamService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: NbToastrService,
    private location: PlatformLocation,
  ) {
    location.onPopState(() => {
      this.back();
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.onlineExamService.getOnlineExamData().subscribe((onlineExam: OnlineExamModel) => {
      if (onlineExam) {
        this.onlineExamService.getOnlineExamResult(onlineExam._id).subscribe(
          (onlineExamResult: OnlineExamResultModel) => {
            this.onlineExamResult = onlineExamResult;
            this.loading = false;
          },
          (error: any) => {
            this.showToastr('top-right', 'danger', error);
            this.back();
          },
        );
      } else {
        this.back();
      }
    });
  }

  getPassingMarks(passingMarks: any, totalMarks: any) {
    return Math.ceil((+totalMarks / 100) * passingMarks);
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
