import { LectureMaterialService } from '../../../../../services/lecture-material.service';
import { ScheduleModel as LectureModel } from '../../../../../models/schedule.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { LectureService } from '../../../../../services/lecture.service';
import { NbToastrService } from '@nebular/theme';
import { BranchService } from '../../../../../services/branch.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-add-study-material',
  templateUrl: './add-study-material.component.html',
  styleUrls: ['./add-study-material.component.scss'],
})
export class AddStudyMaterialComponent implements OnInit {
  @ViewChild('filePicker') private fileInput: any;
  uploadLectureMaterials: File[];

  loading: boolean;
  invalidFile: boolean;

  private branchId: string;
  lecture: LectureModel;

  constructor(
    private branchService: BranchService,
    private lectureService: LectureService,
    private lectureMaterialService: LectureMaterialService,
    private toastrService: NbToastrService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.invalidFile = false;

    this.branchId = this.branchService.getBranchId();

    if (!this.branchId) {
      this.showToastr('top-right', 'danger', 'Invalid Lecture');
      this.cancel();
      return;
    }

    this.uploadLectureMaterials = [];

    this.lectureService.getLectureData().subscribe((lecture: LectureModel) => {
      if (!lecture) {
        // this.showToastr('top-right', 'danger', 'Lecture Not Available');
        this.cancel();
        return;
      }
      this.lecture = lecture;
      this.loading = false;
    });
  }

  onFilePicked(event: Event) {
    this.invalidFile = false;
    const files = (event.target as HTMLInputElement).files;
    const fileExt: string[] = ['pdf', 'jpg', 'png', 'jpeg', 'mp4'];
    let ext: string = null;
    const n: number = files.length;
    for (let i = 0; i < n; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(fileExt.indexOf(ext) !== -1)) {
        this.invalidFile = true;
        this.fileInput.nativeElement.value = '';
        return;
      }
    }
    this.invalidFile = false;
    for (let i = 0; i < n; i++) {
      this.uploadLectureMaterials.push(files[i]);
    }
    this.fileInput.nativeElement.value = '';
  }
  saveLectureMaterial() {
    if (this.uploadLectureMaterials.length < 1) {
      this.showToastr('top-right', 'danger', 'Select at least 1 Lecture material File');
      this.invalidFile = true;
      return;
    }

    this.loading = true;
    this.invalidFile = false;

    const lectureMaterials = new FormData();
    lectureMaterials.append('branch', this.branchId);
    lectureMaterials.append('category', this.lecture.category);
    lectureMaterials.append('course', this.lecture.course);
    lectureMaterials.append('batch', this.lecture.batch);
    lectureMaterials.append('lecture', this.lecture._id);
    for (let i = 0; i < this.uploadLectureMaterials.length; i++) {
      lectureMaterials.append(
        'material',
        this.uploadLectureMaterials[i],
        this.uploadLectureMaterials[i].name.substring(
          0,
          this.uploadLectureMaterials[i].name.lastIndexOf('.'),
        ),
      );
    }

    this.lectureMaterialService.newLectureMaterials(lectureMaterials).subscribe(
      (res: any) => {
        const totalFiles = this.uploadLectureMaterials.length;
        const overStorageFiles = res.overStorageFiles;
        if (overStorageFiles < totalFiles) {
          this.showToastr(
            'top-right',
            'success',
            `${totalFiles - overStorageFiles} file${
              totalFiles - overStorageFiles === 1 ? ' is' : 's are'
            } Uploaded Successfully!`,
          );
        }

        if (overStorageFiles > 0) {
          this.showToastr(
            'top-right',
            'danger',
            `Storage is full, ${overStorageFiles} file${
              overStorageFiles === 1 ? ' is' : 's are'
            } not Uploaded`,
          );
        }

        this.uploadLectureMaterials = [];
        this.cancel();
      },
      (error: any) => {
        this.loading = false;
      },
    );
  }

  removeFile(index: number) {
    this.uploadLectureMaterials.splice(index, 1);
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
