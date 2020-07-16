import { RoleService } from './../../services/role.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EncryptService } from '../../services/shared-services/encrypt.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/shared-services/user.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../authentication.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  userExist: boolean;
  loading: boolean;
  termsConditions: boolean;
  roles: string[];
  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private encryptService: EncryptService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.roles = this.roleService.getUserRoles();
    this.userExist = false;
    this.form = new FormGroup(
      {
        name: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
        }),
        email: new FormControl(null, {
          validators: [Validators.required, Validators.email],
        }),
        phone: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
        }),
        password: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)],
        }),
        confirmPassword: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)],
        }),
        userRole: new FormControl(this.roles[0], {
          validators: [Validators.required],
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

  checkUser() {
    if (this.form.get('email').valid) {
      this.userService.checkUser(this.form.value.email).subscribe(
        (res: any) => {
          this.userExist = res.exist;
        },
        (error: any) => {},
      );
    }
  }

  acceptTermsConditions(e: any) {
    this.termsConditions = e;
  }

  register() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.showToastr('top-right', 'danger', 'All Fields are required');
      return;
    } else if (this.userExist) {
      this.showToastr('top-right', 'danger', 'This user Already exist, Please try another Email');
      return;
    } else if (!this.termsConditions) {
      this.showToastr('top-right', 'warning', 'Accept Terms & Conditions');
      return;
    }

    this.loading = true;

    const data = {
      name: this.form.value.name.toLowerCase(),
      userRole: this.form.value.userRole,
      email: this.form.value.email,
      phone: this.form.value.phone,
      password: this.encryptService.encrypt(this.form.value.password, environment.encKey),
    };

    let authObs: Observable<any>;

    authObs = this.authService.createUser(data);

    authObs.subscribe(
      (res: any) => {
        this.loading = false;
        this.showToastr('top-right', 'success', 'New User Created Successfully');
        this.router.navigate(['/login'], { relativeTo: this.route });
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
