import { MenuService } from './../../menu.service';
import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'ngx-view-institute',
  templateUrl: './view-institute.component.html',
  styleUrls: ['./view-institute.component.scss'],
})
export class ViewInstituteComponent implements OnInit {
  constructor(private menuService: MenuService, private branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.setBranchId('');
    this.menuService.hideMenu();
  }
}
