import { NbToastrService } from '@nebular/theme';
import { CategoryModel, BranchModel } from './../../../../models/branch.model';
import { StudentService } from './../../../../services/student.service';
import { BranchStudentService } from '../../../../services/branch-student.service';
import { BranchStudentModel } from '../../../../models/branch-student.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';

@Component({
  selector: 'ngx-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss'],
})
export class ManageStudentComponent implements OnInit {
  loading: boolean;
  private branchId: string;
  type: string;
  branchStudents: BranchStudentModel[];

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

    this.route.queryParams.subscribe((param: Params) => {
      this.type = param.type;
    });

    if (this.type !== 'active' && this.type !== 'inactive') {
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.studentService.setStudentType(this.type);

    this.branchStudents = [];
    this.categories = [];
    this.category = '';
    this.getCategories();
    this.getStudents(this.category);
  }

  private getCategories() {
    this.branchService.getBranchData().subscribe((branch: BranchModel) => {
      this.categories = branch.categories;
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
    this.branchStudentService.getBranchStudents(this.branchId, category, this.type).subscribe(
      (branchStudents: BranchStudentModel[]) => {
        this.branchStudents = branchStudents;
        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  editBranchStudent(id: string, student: string) {
    this.studentService.setStudentId(student);
    this.branchStudentService.setBranchStudentId(id);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  branchStudentCourses(id: string, student: string, category: string) {
    this.studentService.setStudentId(student);
    this.branchService.setCategoryId(category);
    this.branchStudentService.setBranchStudentId(id);
    this.router.navigate(['../course'], { relativeTo: this.route });
  }

  branchAddStudentCourses(id: string, student: string, category: string) {
    this.studentService.setStudentId(student);
    this.branchService.setCategoryId(category);
    this.branchStudentService.setBranchStudentId(id);
    this.router.navigate(['../course/add'], { relativeTo: this.route });
  }

  changeBranchStudentStatus(id: string, status: boolean, i: number) {
    this.branchStudentService.changeBranchStudentStatus(id, status).subscribe(
      (res: any) => {
        this.branchStudents.splice(i, 1);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      },
    );
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
