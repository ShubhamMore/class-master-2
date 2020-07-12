import { BranchService } from './../../services/branch.service';
import { MenuService } from './../menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-manage-institute',
  templateUrl: './manage-institute.component.html',
  styleUrls: ['./manage-institute.component.scss'],
})
export class ManageInstituteComponent implements OnInit {
  constructor(private menuService: MenuService, private branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.setBranchId('');
    this.menuService.hideMenu();
  }
}
