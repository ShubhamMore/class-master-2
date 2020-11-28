import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseMaterialService } from '../../../../../../services/course-material.service';
import { CourseModel } from '../../../../../../models/course.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../../../../../../services/course.service';
import { NbToastrService } from '@nebular/theme';
import { BranchService } from '../../../../../../services/branch.service';

@Component({
  selector: 'ngx-add-course-material',
  templateUrl: './add-course-material.component.html',
  styleUrls: ['./add-course-material.component.scss'],
})
export class AddCourseMaterialComponent implements OnInit {
  @ViewChild('filePicker') private fileInput: any;
  uploadCourseMaterials: File[];

  loading: boolean;
  invalidFile: boolean;

  private branchId: string;
  private courseId: string;
  course: CourseModel;

  subject: string;
  invalidSubject: boolean;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private courseMaterialService: CourseMaterialService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.invalidFile = false;
    this.invalidSubject = false;

    this.branchId = this.branchService.getBranchId();
    this.courseId = this.courseService.getCourseId();
    if (!this.branchId || !this.courseId) {
      this.showToastr('top-right', 'danger', 'Invalid Course');
      this.cancel();
      return;
    }

    this.uploadCourseMaterials = [];
    this.subject = '';
    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      if (!course) {
        this.cancel();
        return;
      }
      this.course = course;
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
      this.uploadCourseMaterials.push(files[i]);
    }
    this.fileInput.nativeElement.value = '';
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    if (subject === '') {
      this.invalidSubject = true;
    } else {
      this.invalidSubject = false;
    }
  }

  saveCourseMaterial() {
    if (!this.subject || this.subject === '') {
      this.invalidSubject = true;
    }

    if (this.uploadCourseMaterials.length < 1) {
      this.showToastr('top-right', 'danger', 'Select at least 1 Course material File');
      this.invalidFile = true;
      return;
    } else if (this.invalidSubject) {
      this.showToastr('top-right', 'danger', 'Please Select Subject');
      return;
    }

    this.loading = true;
    this.invalidFile = false;

    const courseMaterials = new FormData();
    courseMaterials.append('branch', this.branchId);
    courseMaterials.append('category', this.course.basicDetails.category);
    courseMaterials.append('course', this.courseId);
    courseMaterials.append('subject', this.subject);
    for (let i = 0; i < this.uploadCourseMaterials.length; i++) {
      courseMaterials.append(
        'material',
        this.uploadCourseMaterials[i],
        this.uploadCourseMaterials[i].name.substring(
          0,
          this.uploadCourseMaterials[i].name.lastIndexOf('.'),
        ),
      );
    }

    this.courseMaterialService.newCourseMaterials(courseMaterials).subscribe(
      (res: any) => {
        const totalFiles = this.uploadCourseMaterials.length;
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

        this.uploadCourseMaterials = [];
        this.cancel();
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  removeFile(index: number) {
    this.uploadCourseMaterials.splice(index, 1);
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
