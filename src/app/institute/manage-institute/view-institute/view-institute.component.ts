import { BranchModel, CategoryModel } from '../../../models/branch.model';
import { MenuService } from './../../menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from '../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-view-institute',
  templateUrl: './view-institute.component.html',
  styleUrls: ['./view-institute.component.scss'],
})
export class ViewInstituteComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;
  branch: BranchModel;

  constructor(
    private menuService: MenuService,

    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.menuService.hideMenu();

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.branchService.getBranch(this.branchId).subscribe(
      (branch: BranchModel) => {
        this.branch = branch;
        this.loading = false;
      },
      (error: any) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
    );
  }

  getCategories() {
    const categories: string[] = [];
    this.branch.categories.forEach((category: CategoryModel) => {
      categories.push(category.category);
    });

    return categories.join(', ');
  }

  ngOnDestroy() {
    this.branchService.deleteBranchId();
  }
}
