import { OnlineExamService } from './../../../../../services/online-exam.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-online-test-question',
  templateUrl: './online-test-question.component.html',
  styleUrls: ['./online-test-question.component.scss'],
})
export class OnlineTestQuestionComponent implements OnInit, OnDestroy {
  loading: boolean;

  constructor(private onlineExamService: OnlineExamService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.onlineExamService.deleteOnlineExamId();
    this.onlineExamService.deleteOnlineExamData();
  }
}
