import { StudentService } from './../../../services/student.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  constructor(
    private branchService: BranchService,
    private studentService: StudentService,
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
    this.studentService.deleteStudentType();
  }
}
