import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService, AuthResponseData } from '../auth/auth-service/auth.service';
import { EncryptService } from '../../services/shared-services/encrypt.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean;

  authObs: Observable<AuthResponseData>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService,
    private encryptService: EncryptService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;

    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.loading = false;
  }

  login() {
    if (!this.form.valid) {
      return;
    }
    this.loading = true;

    const email = this.form.value.email;
    const password = this.encryptService.encrypt(this.form.value.password, environment.encKey);

    this.authObs = this.authService.login(email, password);
    this.authSubscribe();
  }

  authSubscribe() {
    this.authObs.subscribe(
      (res: any) => {
        this.loading = false;
        this.showToastr('top-right', 'success', 'Login successful!');
        if (res.userRole === 'admin') {
          this.router.navigate(['/admin'], { relativeTo: this.route });
        } else if (res.userRole === 'employee' || res.userRole === 'institute') {
          this.router.navigate(['/institute'], { relativeTo: this.route });
        } else if (res.userRole === 'student') {
          this.router.navigate(['/student'], { relativeTo: this.route });
        } else {
          this.router.navigate(['/login'], {
            relativeTo: this.route,
          });
        }
        this.form.reset();
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
