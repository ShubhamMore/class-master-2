import { StudentCourseService } from './../../../../../services/student-course.service';
import { StudentCourseModel } from './../../../../../models/student-course.model';
import { SubjectService } from './../../../../../services/subject.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService, Month } from './../../../../../services/shared-services/date.service';
import { AssignmentService } from './../../../../../services/assignment.service';
import { BatchService } from './../../../../../services/batch.service';
import { CourseService } from './../../../../../services/course.service';
import { BranchService } from './../../../../../services/branch.service';
import { AssignmentModel } from './../../../../../models/assignment.model';
import { CategoryModel } from './../../../../../models/branch.model';
import { CourseModel, SubjectModel } from './../../../../../models/course.model';
import { BatchModel } from './../../../../../models/batch.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-manage-assignment',
  templateUrl: './manage-assignment.component.html',
  styleUrls: ['./manage-assignment.component.scss'],
})
export class ManageAssignmentComponent implements OnInit {
  loading: boolean;

  branchId: string;

  studentCourse: StudentCourseModel;

  months: Month[];
  month: string;

  years: string[];
  year: string;

  subjects: SubjectModel[];
  subject: string;

  assignments: AssignmentModel[];

  constructor(
    private branchService: BranchService,
    private studentCourseService: StudentCourseService,
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
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.studentCourseService
      .getStudentCourseData()
      .subscribe((studentCourse: StudentCourseModel) => {
        this.studentCourse = studentCourse;
      });

    this.subjects = [];
    this.subject = '';

    this.subjectService.getSubjectsData().subscribe((subjects: SubjectModel[]) => {
      this.subjects = subjects;
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
        this.studentCourse.category,
        this.studentCourse.course,
        this.studentCourse.batch,
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

  assignmentSubmission(assignment: AssignmentModel) {
    this.assignmentService.setAssignmentId(assignment._id);
    this.assignmentService.setAssignmentData(assignment);
    this.router.navigate(['../submission'], { relativeTo: this.route });
  }

  getSubjectName(id: string) {
    const subject = this.subjects.find((curSubject: SubjectModel) => curSubject._id === id);
    if (subject) {
      return subject.subject;
    }

    return '--';
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
