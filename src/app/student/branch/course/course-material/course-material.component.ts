import { StudentBranchService } from './../../student-branch.service';
import { StudentCourseService } from './../../../../services/student-course.service';
import { LectureService } from './../../../../services/lecture.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-course-material',
  templateUrl: './course-material.component.html',
  styleUrls: ['./course-material.component.scss'],
})
export class CourseMaterialComponent implements OnInit, OnDestroy {
  loading: boolean;
  private branchId: string;

  constructor(
    private branchService: BranchService,
    private studentBranchService: StudentBranchService,
    private lectureService: LectureService,
    private studentCourseService: StudentCourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }
  }

  ngOnDestroy() {
    this.lectureService.setSearchDate(null);
    this.studentCourseService.deleteStudentCourseData();
  }
}
