import { LectureService } from './../../../services/lecture.service';
import { BranchEmployeeService } from './../../../services/branch-employee.service';
import { BranchEmployeeModel } from '../../../models/branch-employee.model';
import { BatchModel } from '../../../models/batch.model';
import { CourseModel } from '../../../models/course.model';
import { CourseService } from './../../../services/course.service';
import { BatchService } from './../../../services/batch.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
})
export class LectureComponent implements OnInit, OnDestroy {
  loading: boolean;
  private branchId: string;

  constructor(
    private branchService: BranchService,
    private branchEmployeeService: BranchEmployeeService,
    private lectureService: LectureService,
    private courseService: CourseService,
    private batchService: BatchService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.courseService.getCourses(this.branchId, '').subscribe(
      (courses: CourseModel[]) => {
        this.courseService.setCoursesData(courses);
        this.loading = false;
      },
      (error: any) => {},
    );

    this.batchService.getBatches(this.branchId, '', '').subscribe(
      (batches: BatchModel[]) => {
        this.batchService.setBatchesData(batches);
      },
      (error: any) => {},
    );

    this.branchEmployeeService.getBranchEmployeesForBatch(this.branchId, 'teacher').subscribe(
      (employees: BranchEmployeeModel[]) => {
        this.branchEmployeeService.setBranchEmployeesData(employees);
        this.loading = false;
      },
      (error: any) => {
        this.back();
      },
    );
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.courseService.deleteCoursesData();
    this.batchService.deleteBatchesData();
    this.lectureService.setSearchDate(null);
  }
}
