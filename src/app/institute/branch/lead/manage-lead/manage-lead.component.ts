import { NbToastrService } from '@nebular/theme';
import { CategoryModel, BranchModel } from './../../../../models/branch.model';
import { StudentService } from './../../../../services/student.service';
import { LeadService } from '../../../../services/lead.service';
import { LeadModel } from '../../../../models/lead.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';

@Component({
  selector: 'ngx-manage-lead',
  templateUrl: './manage-lead.component.html',
  styleUrls: ['./manage-lead.component.scss'],
})
export class ManageLeadComponent implements OnInit {
  loading: boolean;
  private branchId: string;
  type: string;

  categories: CategoryModel[];
  leads: LeadModel[];

  constructor(
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private leadService: LeadService,

    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      // put the code from `ngOnInit` here
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.route.queryParams.subscribe((param: Params) => {
      this.type = param.type;
    });

    if (this.type !== 'active' && this.type !== 'inactive') {
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }
    this.leads = [];
    this.categories = [];
    this.getCategories();
  }

  private getCategories() {
    this.categories = this.branchService.getBranchData().categories;

    if (!this.categories) {
      this.branchService.getBranch(this.branchId).subscribe(
        (branch: BranchModel) => {
          this.branchService.setBranchData(branch);
          this.categories = branch.categories;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    }
  }

  getLeads(category: string, course: string) {
    this.loading = true;
  }

  editLead(id: string, student: string) {
    this.leadService.setLeadId(id);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  deleteLead(id: string) {
    this.branchService.setCategoryId(id);
    this.leadService.setLeadId(id);
    this.router.navigate(['../course/add'], { relativeTo: this.route });
  }

  reopen(id: string) {
    this.branchService.setCategoryId(id);
    this.leadService.setLeadId(id);
    this.router.navigate(['../course/add'], { relativeTo: this.route });
  }

  lostLead(id: string) {
    this.branchService.setCategoryId(id);
    this.leadService.setLeadId(id);
    this.router.navigate(['../course/add'], { relativeTo: this.route });
  }

  wonLead(categoryId: string) {
    const category = this.categories.find(
      (curCategory: CategoryModel) => curCategory._id === categoryId,
    );

    if (category) {
      return category.category;
    }

    return '--';
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
