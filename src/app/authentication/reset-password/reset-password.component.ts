import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/shared-services/http.service';
import { EncryptService } from '../../services/shared-services/encrypt.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../authentication.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  loading: boolean;

  token: string;
  user: string;

  constructor(
    private httpService: HttpService,
    private toastrService: NbToastrService,
    private roure: ActivatedRoute,
    private encryptService: EncryptService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.loading = true;

    this.form = this.formBuilder.group({
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)],
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)],
      }),
    });

    this.roure.queryParams.subscribe((params: Params) => {
      if (params.key === undefined) {
        this.showToastr('top-right', 'danger', 'Invalid Key');
        this.router.navigate(['../page_not_found'], { relativeTo: this.roure });
      } else {
        this.token = params.key;

        const data = { api: 'validateToken', data: { token: this.token } };
        this.httpService.httpPost(data).subscribe(
          (response: any) => {
            const valid = response.valid_token;
            if (valid) {
              this.loading = false;
            } else {
              this.showToastr('top-right', 'danger', 'Invalid Authentication Token');
              this.router.navigate(['../page_not_found'], {
                relativeTo: this.roure,
              });
            }
          },
          (error: any) => {
            this.showToastr('top-right', 'danger', error);
            this.router.navigate(['../page_not_found'], {
              relativeTo: this.roure,
            });
          },
        );
      }
    });
  }

  reset() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.showToastr('top-right', 'danger', 'Please Fill all Details Correctly');
      return;
    } else if (this.form.hasError('invalidPassword')) {
      this.showToastr('top-right', 'danger', 'Password & Forgot Password Does not Match');
      return;
    }
    this.loading = true;

    const resetPassword = {
      // user: this.user,
      password: this.encryptService.encrypt(this.form.value.password, environment.encKey),
      token: this.token,
    };

    const data = { api: 'resetPassword', data: resetPassword };
    this.httpService.httpPost(data).subscribe(
      (res: any) => {
        this.form.reset();
        this.showToastr('top-right', 'success', 'Password Changed Successfully');
        this.router.navigate(['/login'], { relativeTo: this.roure });
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
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
