import { AssignmentSubmissionModel } from './../../../../models/assignment-submission.model';
import { AssignmentSubmissionService } from './../../../../services/assignment-submission.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from './../../../../services/shared-services/date.service';
import { AssignmentService } from './../../../../services/assignment.service';
import { BranchService } from './../../../../services/branch.service';
import { AssignmentModel } from './../../../../models/assignment.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrls: ['./assignment-submission.component.scss'],
})
export class AssignmentSubmissionComponent implements OnInit {
  loading: boolean;

  branchId: string;

  assignment: AssignmentModel;
  assignmentSubmissions: AssignmentSubmissionModel[];

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

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.assignmentService.getAssignmentData().subscribe((assignment: AssignmentModel) => {
      this.assignment = assignment;

      if (!assignment) {
        this.showToastr('top-right', 'danger', 'Assignment Not Found');
        this.back();
        return;
      }

      this.assignmentSubmissions = [];

      this.assignmentSubmissionService.getAssignmentSubmissions(assignment._id).subscribe(
        (assignmentSubmissions: AssignmentSubmissionModel[]) => {
          this.assignmentSubmissions = assignmentSubmissions;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    });
  }

  markGrade(submission: AssignmentSubmissionModel) {
    this.assignmentSubmissionService.setAssignmentSubmissionData(submission);
    this.router.navigate(['./grade'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../manage'], { relativeTo: this.route });
  }
}
