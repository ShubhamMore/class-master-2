import { NbToastrService } from '@nebular/theme';
import { InstituteKeysService } from './../../services/institute-keys.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstituteKeysModel } from './../../models/institute-keys.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  loading: boolean;
  instituteKeys: InstituteKeysModel;

  zoomKeysForm: FormGroup;
  paymentGatewayKeysForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private instituteKeysService: InstituteKeysService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.zoomKeysForm = new FormGroup({
      accessToken: new FormControl(null, { validators: [Validators.required] }),
      secretToken: new FormControl(null, { validators: [Validators.required] }),
    });

    this.paymentGatewayKeysForm = new FormGroup({
      accessToken: new FormControl(null, { validators: [Validators.required] }),
      secretToken: new FormControl(null, { validators: [Validators.required] }),
    });

    this.instituteKeysService.getInstituteKeys().subscribe(
      (instituteKeys: InstituteKeysModel) => {
        if (instituteKeys && instituteKeys.onlineClassesKeys) {
          this.zoomKeysForm.patchValue({
            accessToken: instituteKeys.onlineClassesKeys.accessKey,
            secretToken: instituteKeys.onlineClassesKeys.secretKey,
          });
        }
        if (instituteKeys && instituteKeys.paymentGatewayKeys) {
          this.paymentGatewayKeysForm.patchValue({
            accessToken: instituteKeys.paymentGatewayKeys.accessKey,
            secretToken: instituteKeys.paymentGatewayKeys.secretKey,
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

    console.log(keys);

    this.instituteKeysService.saveInstituteZoomKeys(keys).subscribe(
      (res: any) => {
        this.instituteKeysService.getZoomAuthLink().subscribe((data: any) => {
          window.open(
            data.authLink,
            '_blank',
            'toolbar,scrollbars,resizable,top=500,left=500,width=400,height=400',
          );
        });

        this.showToastr('top-right', 'success', 'Institute Zoom Keys Saved Successfully!');
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  savePaymentGatewayKeys() {
    this.paymentGatewayKeysForm.markAllAsTouched();

    if (this.paymentGatewayKeysForm.invalid) {
      this.showToastr('top-right', 'danger', 'Please Enter valid Payment Gateway Keys');
      return;
    }

    const keys: any = {
      accessKey: this.paymentGatewayKeysForm.value.accessToken,
      secretKey: this.paymentGatewayKeysForm.value.secretToken,
    };

    console.log(keys);

    this.instituteKeysService.saveInstitutePaymentGatewayKeys(keys).subscribe(
      (res: any) => {
        this.showToastr(
          'top-right',
          'success',
          'Institute Payment Gateway Keys Saved Successfully!',
        );
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
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
