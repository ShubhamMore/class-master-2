import { NbDialogRef } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-leave-comment',
  templateUrl: './leave-comment.component.html',
  styleUrls: ['./leave-comment.component.scss'],
})
export class LeaveCommentComponent implements OnInit {
  comment: string;

  constructor(private ref: NbDialogRef<LeaveCommentComponent>) {}

  ngOnInit(): void {}

  changeComment(comment: string) {
    this.comment = comment;
  }

  submit() {
    this.ref.close(this.comment);
  }
}
