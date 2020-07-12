import { BranchService } from './../../services/branch.service';
import { MenuService } from './../menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-my-institutes',
  templateUrl: './my-institutes.component.html',
  styleUrls: ['./my-institutes.component.scss'],
})
export class MyInstitutesComponent implements OnInit {
  constructor(private menuService: MenuService, private branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.setBranchId('');
    this.menuService.hideMenu();
  }
}
