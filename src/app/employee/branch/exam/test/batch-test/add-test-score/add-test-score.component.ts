import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { BatchService } from './../../../../../../services/batch.service';
import { CourseService } from './../../../../../../services/course.service';
import { BatchModel } from '../../../../../../models/batch.model';
import { CategoryModel } from '../../../../../../models/branch.model';
import { SubjectModel, CourseModel } from '../../../../../../models/course.model';
import { NbToastrService } from '@nebular/theme';
import { DateService } from './../../../../../../services/shared-services/date.service';
import { ExamService } from './../../../../../../services/exam.service';
import { ExamModel } from '../../../../../../models/exam.model';
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

interface StudentScore {
  name: string;
  student: string;
  rollNumber: string;
  marks?: number;
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

  examMarksForm: FormGroup;

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

    this.examMarksForm = new FormGroup({
      marks: new FormArray([]),
    });

    this.branchService.getCategoryData().subscribe((category: CategoryModel) => {
      this.category = category;
    });

    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      this.course = course;
    });

    this.batchService.getBatchData().subscribe((batch: BatchModel) => {
      this.batch = batch;
    });

    this.getStudents();
  }

  private getStudents() {
    this.loading = true;
    this.examService.getStudentsForExam(this.exam._id).subscribe(
      (students: StudentScore[]) => {
        students.map((student: any) => {
          return (student.marks = student.marks ? student.marks : 0);
        });

        const examScore = this.getStudentsScore();
        examScore.controls = [];

        students.forEach((student: any) => {
          this.addStudentScore(student);
        });
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  private getStudentsScore() {
    return this.examMarksForm.get('marks') as FormArray;
  }

  private addStudentScore(student: StudentScore) {
    const examScore = this.getStudentsScore();
    examScore.push(this.newStudentScore(student));
  }

  private newStudentScore(student: StudentScore) {
    return new FormGroup({
      name: new FormControl(student.name, { validators: [Validators.required] }),
      student: new FormControl(student.student, { validators: [Validators.required] }),
      rollNumber: new FormControl(student.rollNumber, { validators: [Validators.required] }),
      marks: new FormControl(student.marks ? student.marks : 0, {
        validators: [Validators.required, Validators.min(0), Validators.max(this.exam.outOfMarks)],
      }),
    });
  }

  isNumber(number: any): boolean {
    return Number.isInteger(number);
  }

  saveMarks() {
    this.examMarksForm.markAllAsTouched();

    if (this.examMarksForm.invalid) {
      this.showToastr('top-right', 'danger', 'Enter Valid Marks for All Students');
      return;
    }

    const studentScore = this.examMarksForm.value.marks;

    this.examService.saveStudentsMarks(this.exam._id, studentScore).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', `Exam Marks Updated Successfully`);
        this.back();
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  getSubject(subject: string) {
    const mySubject = this.course.subjects.find(
      (curSubject: SubjectModel) => curSubject._id === subject,
    );

    if (!mySubject) {
      return '--';
    }
    return mySubject.subject;
  }

  back() {
    this.router.navigate(['../manage'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
