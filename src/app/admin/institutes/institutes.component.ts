import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { InstituteModel } from './../../models/institute.model';
import { Component, OnInit } from '@angular/core';
import { InstituteService } from '../services/institute.service';

@Component({
  selector: 'ngx-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.scss'],
})
export class InstitutesComponent implements OnInit {
  loading: boolean;
  institutes: InstituteModel[];

  constructor(
    private instituteService: InstituteService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.instituteService.getInstitutes().subscribe(
      (institutes: InstituteModel[]) => {
        this.institutes = institutes;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  viewInstitute(institute: InstituteModel) {
    this.instituteService.setInstitute(institute);
    this.router.navigate(['./branch'], { relativeTo: this.route });
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
