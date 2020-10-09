import { DateService } from './../../../../services/shared-services/date.service';
import { CourseService } from './../../../../services/course.service';
import { CourseModel } from './../../../../models/course.model';
import { NbToastrService } from '@nebular/theme';
import { CategoryModel, BranchModel } from './../../../../models/branch.model';
import { LeadService } from '../../../../services/lead.service';
import { LeadModel } from '../../../../models/lead.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';

@Component({
  selector: 'ngx-manage-lead',
  templateUrl: './manage-lead.component.html',
  styleUrls: ['./manage-lead.component.scss'],
})
export class ManageLeadComponent implements OnInit {
  loading: boolean;
  private branchId: string;
  type: string;
  categories: CategoryModel[];
  category: string;
  private courses: CourseModel[];
  myCourses: CourseModel[];
  course: string;
  leads: LeadModel[];

  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    private courseService: CourseService,
    private toastrService: NbToastrService,
    private leadService: LeadService,
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
      this.leadService.setLeadType(this.type);
    });

    if (this.type !== 'active' && this.type !== 'inactive') {
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.leads = [];
    this.categories = [];
    this.category = '';
    this.courses = [];
    this.course = '';
    this.myCourses = [];
    this.getCategories();
    this.getCourses();
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
          this.getLeads(this.category, this.course);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      this.getLeads(this.category, this.course);
    }
  }

  private getCourses() {
    this.courseService.getCoursesData().subscribe((courses: CourseModel[]) => {
      this.courses = courses;
    });
  }

  onSelectCategory(category: string) {
    this.category = category;
    this.course = '';
    this.myCourses = this.courses.filter(
      (course: CourseModel) => course.basicDetails.category === category,
    );
    this.getLeads(this.category, this.course);
  }

  onSelectCourse(course: string) {
    this.course = course;
    this.getLeads(this.category, this.course);
  }

  getLeads(category: string, course: string) {
    this.loading = true;
    this.leadService.getLeads(this.branchId, category, course, this.type).subscribe(
      (leads: LeadModel[]) => {
        this.leads = leads;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  editLead(id: string) {
    this.leadService.setLeadId(id);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  deleteLead(id: string) {
    this.leadService.deleteLead(id).subscribe(
      (res: any) => {
        this.removeLead(id);
        this.showToastr('top-right', 'success', 'Lead Deleted Successfully');
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  private removeLead(id: string) {
    const index = this.leads.findIndex((lead: LeadModel) => lead._id === id);
    if (index >= 0) {
      this.leads.splice(index, 1);
    }
  }

  wonLead(id: string) {
    this.leadService.changeLeadStatus(id, 'won').subscribe(
      (res: any) => {
        this.removeLead(id);
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  reOpenLead(id: string) {
    this.leadService.changeLeadStatus(id, 'open').subscribe(
      (res: any) => {
        this.removeLead(id);
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  lostLead(id: string) {
    this.leadService.changeLeadStatus(id, 'lost').subscribe(
      (res: any) => {
        this.removeLead(id);
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
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

  getCourse(courseId: string) {
    const course = this.courses.find((curCourse: CourseModel) => curCourse._id === courseId);

    if (course) {
      return course.basicDetails.courseName;
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
