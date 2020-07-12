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
  error: string;

  constructor(
    private httpService: HttpService,
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
    if (this.form.valid && !this.form.hasError('invalidPassword')) {
      this.loading = true;
      this.error = null;

      const data = {
        api: 'changePassword',
        data: {
          email: this.authService.getUserData().email,
          password: this.encryptService.encrypt(this.form.value.oldPassword, environment.encKey),
          newPassword: this.encryptService.encrypt(this.form.value.password, environment.encKey),
        },
      };
      this.httpService.httpPost(data).subscribe(
        (resData: any) => {
          this.error = null;
          this.form.reset();
          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        },
      );
    } else {
      this.error = 'Please Fill all The Fields Correctly';
    }
  }

  onErrorClose() {
    this.error = null;
  }
}
