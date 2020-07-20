import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from './../../../../../../services/branch.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-add-online-test-questions',
  templateUrl: './add-online-test-questions.component.html',
  styleUrls: ['./add-online-test-questions.component.scss'],
})
export class AddOnlineTestQuestionsComponent implements OnInit {
  loading: boolean;
  branchId: string;

  constructor(
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.location.back();
      return;
    }
  }
}