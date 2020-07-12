import { BranchService } from './../../services/branch.service';
import { MenuService } from './../menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-membership-plans',
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.scss'],
})
export class MembershipPlansComponent implements OnInit {
  constructor(private menuService: MenuService, private branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.setBranchId('');
    this.menuService.hideMenu();
  }
}
