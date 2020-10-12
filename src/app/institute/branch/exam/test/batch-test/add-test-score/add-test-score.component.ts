import { BatchService } from './../../../../../../services/batch.service';
import { CourseService } from './../../../../../../services/course.service';
import { BatchModel } from './../../../../../../models/batch.model';
import { CategoryModel } from './../../../../../../models/branch.model';
import { SubjectModel, CourseModel } from './../../../../../../models/course.model';
import { NbToastrService } from '@nebular/theme';
import { DateService } from './../../../../../../services/shared-services/date.service';
import { ExamService } from './../../../../../../services/exam.service';
import { ExamModel, MarksModel } from './../../../../../../models/exam.model';
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

  students: StudentScore[];
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

    this.students = [];

    this.getStudents();
  }

  private getStudents() {
    this.loading = true;
    this.examService.getStudentsForExam(this.exam._id).subscribe(
      (students: StudentScore[]) => {
        students.map((student: any) => {
          return (student.marks = student.marks ? student.marks : 0);
        });
        this.students = students;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  isNumber(number: any): boolean {
    return Number.isInteger(number);
  }

  onChangeMarks(marks: number, i: number) {
    if (!marks) {
      marks = 0;
    }
    this.students[i].marks = +marks;
  }

  examMarksValidation() {
    const invalidStudentMarks: string[] = [];

    this.students.forEach((student: StudentScore, i: number) => {
      if (!student.marks) {
        this.students[i].marks = 0;
      } else if (
        this.isNumber(student.marks) &&
        (student.marks > this.exam.outOfMarks || student.marks < 0)
      ) {
        invalidStudentMarks.push(student.name);
      }
    });

    return invalidStudentMarks.join(', ');
  }

  saveMarks() {
    // const invalidStudents = this.examMarksValidation();

    // if (invalidStudents) {
    //   this.showToastr('top-right', 'danger', 'Enter Valid Marks for student ' + invalidStudents);
    //   return;
    // }

    this.examService.saveStudentsMarks(this.exam._id, this.students).subscribe(
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
