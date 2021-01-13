import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssignmentSubmissionModel } from './../../../../../models/assignment-submission.model';
import { AssignmentSubmissionService } from './../../../../../services/assignment-submission.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from './../../../../../services/shared-services/date.service';
import { AssignmentService } from './../../../../../services/assignment.service';
import { BranchService } from './../../../../../services/branch.service';
import { AssignmentModel } from './../../../../../models/assignment.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-submission-grading',
  templateUrl: './submission-grading.component.html',
  styleUrls: ['./submission-grading.component.scss'],
})
export class SubmissionGradingComponent implements OnInit, OnDestroy {
  loading: boolean;
  submit: boolean;

  branchId: string;

  assignment: AssignmentModel;
  assignmentSubmission: AssignmentSubmissionModel;

  assignmentSubmissionForm: FormGroup;

  constructor(
    private branchService: BranchService,
    private assignmentSubmissionService: AssignmentSubmissionService,
    private assignmentService: AssignmentService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.assignmentService.getAssignmentData().subscribe((assignment: AssignmentModel) => {
      this.assignment = assignment;

      if (!assignment) {
        this.showToastr('top-right', 'danger', 'Assignment Not Found');
        this.back();
        return;
      }

      this.assignmentSubmissionService
        .getAssignmentSubmissionData()
        .subscribe((assignmentSubmission: AssignmentSubmissionModel) => {
          this.assignmentSubmission = assignmentSubmission;

          if (!assignmentSubmission) {
            this.back();
            return;
          }

          this.assignmentSubmissionForm = new FormGroup({
            grades: new FormControl(assignmentSubmission.grades, {
              validators: [
                Validators.required,
                Validators.min(0),
                Validators.max(+assignment.totalGrades),
              ],
            }),
            remark: new FormControl(assignmentSubmission.remark, {
              validators: [Validators.required],
            }),
          });

          this.loading = false;
        });
    });
  }

  saveGrades() {
    this.assignmentSubmissionForm.markAllAsTouched();

    if (this.assignmentSubmissionForm.invalid) {
      this.showToastr('top-right', 'danger', 'All grading Fields are required');
      return;
    }

    this.submit = true;

    const submissionGrades = {
      _id: this.assignmentSubmission._id,
      ...this.assignmentSubmissionForm.value,
    };

    this.assignmentSubmissionService.saveAssignmentSubmissionGrades(submissionGrades).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Grades Updated Successfully');
        this.back();
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.submit = false;
      },
    );
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

  ngOnDestroy() {
    this.assignmentSubmissionService.deleteAssignmentSubmissionData();
  }
}
