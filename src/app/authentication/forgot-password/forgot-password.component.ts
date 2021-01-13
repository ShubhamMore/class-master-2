import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/shared-services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../authentication.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  submit: boolean;

  constructor(
    private httpService: HttpService,
    private toastrService: NbToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.submit = false;
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
    });
    this.loading = false;
  }

  forgotPassword() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.showToastr('top-right', 'danger', 'Enter Valid Email Address');
      return;
    }
    this.submit = true;
    const data = {
      api: 'forgotPassword',
      data: {
        email: this.form.value.email,
      },
    };

    this.httpService.httpPost(data).subscribe(
      (res: any) => {
        this.form.reset();
        this.showToastr(
          'top-right',
          'success',
          'Reset Password Link Send to your Email Successfully',
        );
        this.submit = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.submit = false;
      },
    );
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
