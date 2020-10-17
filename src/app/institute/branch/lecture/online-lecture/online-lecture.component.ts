import { EncryptService } from './../../../../services/shared-services/encrypt.service';
import { AuthService } from './../../../../authentication/auth/auth-service/auth.service';
import { environment } from './../../../../../environments/environment';
import { LectureService } from './../../../../services/lecture.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'ngx-online-lecture',
  templateUrl: './online-lecture.component.html',
  styleUrls: ['./online-lecture.component.scss'],
})
export class OnlineLectureComponent implements OnInit {
  loading: boolean;
  zoomURL: any;
  constructor(
    private lectureService: LectureService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private encryptService: EncryptService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    const lecture = this.lectureService.getLectureId();
    const user = this.authService.getUserData().imsMasterId;

    if (!lecture) {
    } else if (!user) {
    }
    this.zoomURL = environment.zoomLiveURL + '?lecture=' + lecture + '&user=' + user;

    console.log(this.zoomURL);
    this.loading = false;
  }
}
