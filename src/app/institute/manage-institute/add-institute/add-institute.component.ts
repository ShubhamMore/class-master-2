import { BranchService } from './../../../services/branch.service';
import { MenuService } from './../../menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-institute',
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.scss'],
})
export class AddInstituteComponent implements OnInit {
  constructor(private menuService: MenuService, private branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.setBranchId('');
    this.menuService.hideMenu();
  }
}
