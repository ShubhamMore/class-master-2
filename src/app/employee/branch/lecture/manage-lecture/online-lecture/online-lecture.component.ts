import { EncryptService } from '../../../../../services/shared-services/encrypt.service';
import { AuthService } from '../../../../../authentication/auth/auth-service/auth.service';
import { environment } from '../../../../../../environments/environment';
import { LectureService } from '../../../../../services/lecture.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ngx-online-lecture',
  templateUrl: './online-lecture.component.html',
  styleUrls: ['./online-lecture.component.scss'],
})
export class OnlineLectureComponent implements OnInit {
  loading: boolean;
  error: string;
  zoomURL: any;
  constructor(
    private lectureService: LectureService,
    private authService: AuthService,
    private encryptService: EncryptService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    const lecture = this.lectureService.getLectureId();
    const user = this.authService.getUserData().imsMasterId;

    this.zoomURL = environment.zoomLiveURL + '?lecture=' + lecture + '&user=' + user;
    this.loading = false;
  }
}
