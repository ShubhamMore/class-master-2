import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstituteKeysModel } from './../../models/institute-keys.model';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  loading: boolean;
  instituteKeys: InstituteKeysModel;

  zoomKeysForm: FormGroup;
  zoomShowSecret: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.zoomShowSecret = false;
    this.zoomKeysForm = new FormGroup({
      accessToken: new FormControl(null, { validators: [Validators.required] }),
      secretToken: new FormControl(null, { validators: [Validators.required] }),
    });

    this.adminService.getAdminZoomKeys().subscribe(
      (zoomKeys: any) => {
        if (zoomKeys) {
          this.zoomKeysForm.patchValue({
            accessToken: zoomKeys.accessKey,
            secretToken: zoomKeys.secretKey,
          });
        }
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  saveZoomKeys() {
    this.zoomKeysForm.markAllAsTouched();

    if (this.zoomKeysForm.invalid) {
      this.showToastr('top-right', 'danger', 'Please Enter valid Zoom Keys');
      return;
    }

    const keys: any = {
      accessKey: this.zoomKeysForm.value.accessToken,
      secretKey: this.zoomKeysForm.value.secretToken,
    };

    this.adminService.saveAdminZoomKeys(keys).subscribe(
      (res: any) => {
        this.adminService.getAdminZoomAuthLink().subscribe((responce: any) => {
          const popup = window.open(
            responce.authLink,
            '_blank',
            'toolbar,scrollbars,resizable,top=200,left=500,width=400,height=400',
          );
          // setTimeout(() => {
          //   popup.close();
          // }, 3000);
        });

        this.showToastr('top-right', 'success', 'Institute Zoom Keys Saved Successfully!');
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  toggleShowZoomSecret() {
    this.zoomShowSecret = !this.zoomShowSecret;
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
