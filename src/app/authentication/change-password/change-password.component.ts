import { NbToastrService } from '@nebular/theme';
import { AuthService } from './../auth/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/shared-services/http.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { EncryptService } from '../../services/shared-services/encrypt.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss', '../authentication.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  loading: boolean;

  constructor(
    private httpService: HttpService,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private encryptService: EncryptService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.form = this.formBuilder.group(
      {
        oldPassword: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)],
        }),
        password: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)],
        }),
        confirmPassword: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)],
        }),
      },
      {
        validators: this.passwordValidator.bind(this),
      },
    );
    this.loading = false;
  }

  passwordValidator(group: FormGroup): { [s: string]: boolean } {
    if (group.value.password !== group.value.confirmPassword) {
      return { invalidConfirmPassword: true };
    }
    return null;
  }

  changePassword() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.showToastr('top-right', 'danger', 'Please Fill all Details Correctly');
      return;
    } else if (this.form.hasError('invalidPassword')) {
      this.showToastr('top-right', 'danger', 'Password & Forgot Password Does not Match');
      return;
    }
    this.loading = true;

    const data = {
      api: 'changePassword',
      data: {
        email: this.authService.getUserData().email,
        password: this.encryptService.encrypt(this.form.value.oldPassword, environment.encKey),
        newPassword: this.encryptService.encrypt(this.form.value.password, environment.encKey),
      },
    };
    this.httpService.httpPost(data).subscribe(
      (res: any) => {
        this.form.reset();
        this.showToastr('top-right', 'success', 'Password Changed Successfully');
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
