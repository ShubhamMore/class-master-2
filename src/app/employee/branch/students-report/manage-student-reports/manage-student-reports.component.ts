import { NbToastrService } from '@nebular/theme';
import { CategoryModel, BranchModel } from '../../../../models/branch.model';
import { StudentService } from './../../../../services/student.service';
import { BranchStudentService } from '../../../../services/branch-student.service';
import { BranchStudentModel } from '../../../../models/branch-student.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-manage-student-reports',
  templateUrl: './manage-student-reports.component.html',
  styleUrls: ['./manage-student-reports.component.scss'],
})
export class ManageStudentReportsComponent implements OnInit {
  loading: boolean;
  private branchId: string;
  branchStudents: BranchStudentModel[];
  filteredBranchStudents: BranchStudentModel[];

  categories: CategoryModel[];
  category: string;
  constructor(
    private branchService: BranchService,
    private studentService: StudentService,
    private toastrService: NbToastrService,
    private branchStudentService: BranchStudentService,

    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      // put the code from `ngOnInit` here
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.branchStudents = [];
    this.filteredBranchStudents = [];
    this.categories = [];
    this.category = '';

    this.getCategories();
    this.getStudents(this.category);
  }

  private getCategories() {
    this.branchService.getBranchData().subscribe((branch: BranchModel) => {
      if (branch) {
        this.categories = branch.categories;
      }
    });

    if (!this.categories) {
      this.branchService.getBranch(this.branchId).subscribe(
        (branch: BranchModel) => {
          this.branchService.setBranchData(branch);
          this.categories = branch.categories;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    }
  }

  getStudents(category: string) {
    this.loading = true;
    this.branchStudentService.getBranchAllStudentNameIds(this.branchId, category).subscribe(
      (branchStudents: BranchStudentModel[]) => {
        this.branchStudents = branchStudents;
        this.filteredBranchStudents = branchStudents;
        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  searchStudent(student: string) {
    student = student.trim().toLowerCase();
    if (student) {
      this.filteredBranchStudents = this.branchStudents.filter(
        (branchStudent: BranchStudentModel) => branchStudent.name.toLowerCase().includes(student),
      );
    } else {
      this.filteredBranchStudents = [...this.branchStudents];
    }
  }

  branchStudentCourses(id: string, student: string, category: string) {
    this.studentService.setStudentId(student);
    this.branchService.setCategoryId(category);
    this.branchStudentService.setBranchStudentId(id);
    this.router.navigate(['../course'], { relativeTo: this.route });
  }

  getCategory(categoryId: string) {
    const category = this.categories.find(
      (curCategory: CategoryModel) => curCategory._id === categoryId,
    );

    if (category) {
      return category.category;
    }

    return '--';
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
