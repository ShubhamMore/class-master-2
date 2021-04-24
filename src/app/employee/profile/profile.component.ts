import { NbToastrService } from '@nebular/theme';
import { environment } from './../../../environments/environment';
import { AuthService } from './../../authentication/auth/auth-service/auth.service';
import { EmployeeModel } from '../../models/employee.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from './../../services/shared-services/user.service';
import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../../services/shared-services/encrypt.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  profileForm: FormGroup;
  changePasswordForm: FormGroup;
  profile: EmployeeModel;
  constructor(
    private userService: UserService,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private encryptService: EncryptService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.profileForm = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(5)] }),
      phone: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      }),
      address: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      }),
      birthDate: new FormControl(null, {
        validators: [],
      }),
      qualification: new FormControl(null, {
        validators: [],
      }),
    });

    this.changePasswordForm = new FormGroup(
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

    this.getProfile();
  }

  private passwordValidator(group: FormGroup): { [s: string]: boolean } {
    if (group.value.password !== group.value.confirmPassword) {
      return { invalidConfirmPassword: true };
    }
    return null;
  }

  private getProfile() {
    this.userService.getProfile().subscribe(
      (res: any) => {
        this.profile = res;
        this.profileForm.patchValue({
          name: this.profile.name,
          phone: this.profile.phone,
          address: this.profile.address,
          birthDate: this.profile.birthDate,
          qualification: this.profile.qualification,
        });

        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      },
    );
  }

  saveProfile() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) {
      this.showToastr('top-right', 'danger', 'Fill Profile Details Correctly');
      return;
    }

    this.loading = true;

    const profile = this.profileForm.value;

    this.userService.saveProfile(profile).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Profile updated Successfully!');
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  changePassword() {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.invalid) {
      this.showToastr('top-right', 'danger', 'Fill change Password Data Correctly');
      return;
    } else if (this.changePasswordForm.hasError('invalidPassword')) {
      this.showToastr('top-right', 'danger', 'New Password and Confirm Password Does Noy Match');
      return;
    }
    this.loading = true;
    const password = {
      email: this.authService.getUserData().email,
      password: this.encryptService.encrypt(
        this.changePasswordForm.value.oldPassword,
        environment.encKey,
      ),
      newPassword: this.encryptService.encrypt(
        this.changePasswordForm.value.password,
        environment.encKey,
      ),
    };

    this.userService.changePassword(password).subscribe(
      (res: any) => {
        this.changePasswordForm.reset();
        this.showToastr('top-right', 'success', 'Password Changed Successfully!');
        this.loading = false;
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
}
