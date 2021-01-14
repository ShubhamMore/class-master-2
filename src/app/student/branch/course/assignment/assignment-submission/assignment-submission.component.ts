import { DateService } from './../../../../../services/shared-services/date.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { BranchService } from './../../../../../services/branch.service';
import { AssignmentService } from './../../../../../services/assignment.service';
import { AssignmentModel } from './../../../../../models/assignment.model';
import { AssignmentSubmissionModel } from './../../../../../models/assignment-submission.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AssignmentSubmissionService } from '../../../../../services/assignment-submission.service';

@Component({
  selector: 'ngx-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrls: ['./assignment-submission.component.scss'],
})
export class AssignmentSubmissionComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;
  @ViewChild('filePicker') private fileInput: any;

  loading: boolean;
  submit: boolean;

  branchId: string;

  assignmentSubmission: AssignmentSubmissionModel;
  assignment: AssignmentModel;

  assignmentSubmissionDetailsForm: FormGroup;

  uploadAssignmentSubmission: File;
  fileName: string;
  invalidFile: boolean;

  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    private assignmentSubmissionService: AssignmentSubmissionService,
    private assignmentService: AssignmentService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.invalidFile = false;
    this.fileName = null;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.assignmentService.getAssignmentData().subscribe((assignment: AssignmentModel) => {
      this.assignment = assignment;
    });

    this.assignmentSubmissionDetailsForm = new FormGroup({
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.assignmentSubmissionService.getSubmissionOfAssignment(this.assignment._id).subscribe(
      (assignmentSubmission: AssignmentSubmissionModel) => {
        if (assignmentSubmission) {
          this.assignmentSubmission = assignmentSubmission;

          this.assignmentSubmissionDetailsForm.patchValue({
            description: assignmentSubmission.description,
          });

          this.fileName = assignmentSubmission.fileName;
        }

        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  onFilePicked(event: Event) {
    this.invalidFile = false;
    const files = (event.target as HTMLInputElement).files;
    const fileExt: string[] = ['pdf', 'jpg', 'png', 'jpeg', 'mp4'];
    let ext: string = null;
    ext = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
    if (!(fileExt.indexOf(ext) !== -1)) {
      this.invalidFile = true;
      this.fileName = files[0].name;
      this.fileInput.nativeElement.value = '';
      return;
    }
    this.invalidFile = false;
    this.uploadAssignmentSubmission = files[0];
    this.fileName = files[0].name;
    this.fileInput.nativeElement.value = '';
  }

  clearFile() {
    this.uploadAssignmentSubmission = null;
    this.fileName = null;
    this.fileInput.nativeElement.value = '';
    this.invalidFile = false;
  }

  submitAssignmentDetails() {
    this.assignmentSubmissionDetailsForm.markAllAsTouched();
    if (this.assignmentSubmissionDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Assignment details are required');
      return;
    } else if (!(this.assignmentSubmission || this.uploadAssignmentSubmission)) {
      this.showToastr('top-right', 'danger', 'Please select a File');
      this.invalidFile = true;
      return;
    } else if (this.invalidFile) {
      this.showToastr('top-right', 'danger', 'Select Valid File');
      return;
    }
    this.stepper.next();
  }

  saveAssignment() {
    this.assignmentSubmissionDetailsForm.markAllAsTouched();

    if (this.assignmentSubmissionDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Assignment details are required');
      return;
    } else if (!(this.assignmentSubmission || this.uploadAssignmentSubmission)) {
      this.showToastr('top-right', 'danger', 'Please select a File');
      this.invalidFile = true;
      return;
    } else if (this.invalidFile) {
      this.showToastr('top-right', 'danger', 'Select Valid File');
      return;
    }

    this.submit = true;

    const assignmentSubmission = new FormData();

    assignmentSubmission.append('branch', this.branchId);
    assignmentSubmission.append('assignment', this.assignment._id);
    assignmentSubmission.append(
      'description',
      this.assignmentSubmissionDetailsForm.value.description,
    );

    if (this.uploadAssignmentSubmission) {
      assignmentSubmission.append(
        'assignmentSubmission',
        this.uploadAssignmentSubmission,
        this.uploadAssignmentSubmission.name.substring(
          0,
          this.uploadAssignmentSubmission.name.lastIndexOf('.'),
        ),
      );
    }

    if (!this.assignmentSubmission) {
      this.assignmentSubmissionService.submitAssignment(assignmentSubmission).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Assignment Added Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      assignmentSubmission.append('_id', this.assignmentSubmission._id);

      this.assignmentSubmissionService.updateAssignmentSubmission(assignmentSubmission).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Assignment Submission Updated Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    }
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
