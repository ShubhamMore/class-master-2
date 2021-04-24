import { BranchModel } from '../../../models/branch.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { InstituteModel } from '../../../models/institute.model';
import { Component, OnInit } from '@angular/core';
import { InstituteService } from '../../services/institute.service';

@Component({
  selector: 'ngx-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  loading: boolean;
  institute: InstituteModel;
  branches: BranchModel[];

  constructor(
    private instituteService: InstituteService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.instituteService.getInstitute().subscribe((institute: InstituteModel) => {
      if (!institute) {
        this.showToastr('top right', 'danger', 'Invalid Institute');
        return;
      }

      this.institute = institute;

      this.instituteService.getInstituteBranches(institute.imsMasterId).subscribe(
        (branches: BranchModel[]) => {
          this.branches = branches;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top right', 'danger', error);
          this.loading = false;
        },
      );
    });
  }

  viewBranch(branch: BranchModel) {
    this.instituteService.setBranch(branch);
    this.router.navigate(['./history'], { relativeTo: this.route });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
