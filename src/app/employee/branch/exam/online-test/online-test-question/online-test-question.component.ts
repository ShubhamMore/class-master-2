import { OnlineExamQuestionService } from './../../../../../services/online-exam-question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineExamModel } from '../../../../../models/online-exam.model';
import { OnlineExamService } from './../../../../../services/online-exam.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-online-test-question',
  templateUrl: './online-test-question.component.html',
  styleUrls: ['./online-test-question.component.scss'],
})
export class OnlineTestQuestionComponent implements OnInit, OnDestroy {
  loading: boolean;

  constructor(
    private onlineExamService: OnlineExamService,
    private onlineExamQuestionService: OnlineExamQuestionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.onlineExamService.getOnlineExamData().subscribe((onlineExam: OnlineExamModel) => {
      if (!onlineExam) {
        this.router.navigate(['../'], { relativeTo: this.route });
        return;
      }
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.onlineExamQuestionService.deleteOnlineExamQuestionId();
    this.onlineExamQuestionService.deleteOnlineExamQuestionData();
    this.onlineExamService.deleteOnlineExamId();
    this.onlineExamService.deleteOnlineExamData();
  }
}
