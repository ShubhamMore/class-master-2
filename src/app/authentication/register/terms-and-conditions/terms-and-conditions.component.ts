import { NbDialogRef } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  constructor(protected ref: NbDialogRef<TermsAndConditionsComponent>) {}

  ngOnInit(): void {}

  close() {
    this.ref.close(false);
  }

  agree() {
    this.ref.close(true);
  }
}
