import { BatchService } from './../../../../../../services/batch.service';
import { CourseService } from './../../../../../../services/course.service';
import { BatchModel } from './../../../../../../models/batch.model';
import { CategoryModel } from './../../../../../../models/branch.model';
import { SubjectModel, CourseModel } from './../../../../../../models/course.model';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { DateService } from './../../../../../../services/shared-services/date.service';
import { ExamService } from './../../../../../../services/exam.service';
import { ExamModel, MarksModel } from './../../../../../../models/exam.model';
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

class Student {
  constructor(public student: string) {}
}

@Component({
  selector: 'ngx-add-test-score',
  templateUrl: './add-test-score.component.html',
  styleUrls: ['./add-test-score.component.scss'],
})
export class AddTestScoreComponent implements OnInit {
  loading: boolean;
  branchId: string;

  exam: ExamModel;

  category: CategoryModel;
  course: CourseModel;
  batch: BatchModel;

  studentMarksForm: FormGroup;

  private students: Student[];
  constructor(
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private courseService: CourseService,
    private batchService: BatchService,
    private router: Router,
    private examService: ExamService,
    public dateService: DateService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.examService.getExamData().subscribe((exam: ExamModel) => {
      this.exam = exam;
    });

    if (!this.exam) {
      this.showToastr('top-right', 'danger', 'Exam Not Found');
      this.back();
      return;
    }

    this.branchService.getCategoryData().subscribe((category: CategoryModel) => {
      this.category = category;
    });

    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      this.course = course;
    });

    this.batchService.getBatchData().subscribe((batch: BatchModel) => {
      this.batch = batch;
    });

    this.studentMarksForm = new FormGroup({ marks: new FormArray([]) });

    this.students = [];

    const marks = this.getMarks();
    marks.controls = [];

    this.examService
      .getStudents(this.exam.branch, this.exam.category, this.exam.course, this.exam.batch)
      .subscribe(
        (students: Student[]) => {
          this.students = students;

          if (this.exam.marks.length > 0) {
            this.exam.marks.forEach((myMarks: MarksModel) => {
              this.addStudentMark(myMarks.student, myMarks.marks);
            });
          } else {
            students.forEach((student: Student) => {
              this.addStudentMark(student.student, null);
            });
          }

          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.back();
        },
      );
  }

  private getMarks() {
    return this.studentMarksForm.get('marks') as FormArray;
  }

  private addStudentMark(student: string, marks: number) {
    const studentMarks = new FormGroup({
      student: new FormControl(student, { validators: [Validators.required] }),
      marks: new FormControl(marks, { validators: [Validators.required] }),
    });

    return studentMarks;
  }

  saveMarks() {
    this.studentMarksForm.markAllAsTouched();
    if (this.studentMarksForm.invalid) {
      this.showToastr('top-right', 'danger', 'Enter All Students valid Marks');
      return;
    }

    this.loading = true;

    const marks = this.studentMarksForm.value.marks;

    this.examService.saveStudentsMarks(this.exam._id, marks).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Exam Score Updates Successfully!');
        this.back();
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  getSubject(subjectId: string) {
    const subject = this.course.subjects.find(
      (curSubject: SubjectModel) => curSubject._id === subjectId,
    );
    if (subject) {
      return subject.subject;
    }

    return '--';
  }

  getStudent(studentId: string) {
    const myStudent = this.students.find((student: Student) => student.student === studentId);
    if (myStudent) {
      return myStudent.student;
    }

    return '--';
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
