import { SubjectService } from './../../../../services/subject.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService, Month } from './../../../../services/shared-services/date.service';
import { AssignmentService } from './../../../../services/assignment.service';
import { BatchService } from './../../../../services/batch.service';
import { CourseService } from './../../../../services/course.service';
import { BranchService } from './../../../../services/branch.service';
import { AssignmentModel } from '../../../../models/assignment.model';
import { CategoryModel } from '../../../../models/branch.model';
import { CourseModel, SubjectModel } from '../../../../models/course.model';
import { BatchModel } from '../../../../models/batch.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-manage-assignment',
  templateUrl: './manage-assignment.component.html',
  styleUrls: ['./manage-assignment.component.scss'],
})
export class ManageAssignmentComponent implements OnInit {
  loading: boolean;

  branchId: string;

  batch: BatchModel;
  course: CourseModel;
  category: CategoryModel;

  months: Month[];
  month: string;

  years: string[];
  year: string;

  subjects: SubjectModel[];
  subject: string;

  assignments: AssignmentModel[];

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private batchService: BatchService,
    private subjectService: SubjectService,
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

    this.subjects = [];
    this.subject = '';

    this.branchService.getCategoryData().subscribe((category: CategoryModel) => {
      this.category = category;
    });

    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      if (course) {
        this.course = course;
        this.batchService.getBatchData().subscribe((batch: BatchModel) => {
          if (batch) {
            this.batch = batch;
            this.batchService.getBatchSubjects(this.course._id, this.batch._id).subscribe(
              (subjects: SubjectModel[]) => {
                this.subjects = subjects;
                this.subjectService.setSubjectsData(subjects);
              },
              (error: any) => {
                this.showToastr('top-right', 'danger', error);
              },
            );
          }
        });
      }
    });

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = (this.dateService.getDate().getMonth() + 1).toString().padStart(2, '0');
    this.year = this.years[this.years.length - 1];

    this.getAssignments();
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    this.getAssignments();
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.getAssignments();
  }

  onSelectYear(year: string) {
    this.year = year;
    if (year === '') {
      this.month = '';
    }
    this.getAssignments();
  }

  getAssignments() {
    this.loading = true;
    this.assignmentService
      .getAssignments(
        this.branchId,
        this.category._id,
        this.course._id,
        this.batch._id,
        this.subject,
        this.month,
        this.year,
      )
      .subscribe(
        (assignments: AssignmentModel[]) => {
          this.assignments = assignments;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
  }

  addAssignment() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  editAssignment(assignment: AssignmentModel) {
    this.assignmentService.setAssignmentId(assignment._id);
    this.assignmentService.setAssignmentData(assignment);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  assignmentSubmissions(assignment: AssignmentModel) {
    this.assignmentService.setAssignmentId(assignment._id);
    this.assignmentService.setAssignmentData(assignment);
    this.router.navigate(['../submission'], { relativeTo: this.route });
  }

  deleteAssignment(id: string) {
    this.loading = true;
    this.assignmentService.deleteAssignment(id).subscribe(
      (res: any) => {
        const index = this.assignments.findIndex(
          (assignment: AssignmentModel) => assignment._id === id,
        );
        if (index >= 0) {
          this.assignments.splice(index, 1);
        }
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  getSubjectName(id: string) {
    const subject = this.subjects.find((curSubject: SubjectModel) => curSubject._id === id);
    if (subject) {
      return subject.subject;
    }

    return '--';
  }

  deleteAssignmentAttachment(id: string, publicId: string, i: number) {
    this.assignmentService.deleteAssignmentAttachment(id, publicId).subscribe(
      (res: any) => {
        this.assignments[i].fileName = null;
        this.assignments[i].fileSize = null;
        this.assignments[i].fileType = null;
        this.assignments[i].secureUrl = null;
        this.assignments[i].publicId = null;
        this.showToastr('top-right', 'success', 'Attachment Deleted Successfully!');
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
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
}
