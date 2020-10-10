import { DateService } from './../../../../services/shared-services/date.service';
import { CategoryModel, BranchModel } from './../../../../models/branch.model';
import { CourseModel } from './../../../../models/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LeadService } from './../../../../services/lead.service';
import { LeadModel } from './../../../../models/lead.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../../../../services/course.service';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss'],
})
export class AddLeadComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  private branchId: string;

  private leadId: string;
  lead: LeadModel;

  sources: string[];
  strengths: string[];
  modes: string[];
  statuses: string[];

  categories: CategoryModel[];
  private courses: CourseModel[];
  myCourses: CourseModel[];

  leadForm: FormGroup;

  constructor(
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private leadService: LeadService,
    public dateService: DateService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    route.queryParams.subscribe((param: Params) => {
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

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    this.leadId = this.leadService.getLeadId();

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.leadId) {
      this.showToastr('top-right', 'danger', 'Lead Not Found');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.categories = [];
    this.courses = [];
    this.myCourses = [];

    this.modes = ['walk in', 'telephonic', 'email', 'digital'];
    this.strengths = ['hot', 'cold'];
    this.sources = [
      'referral',
      'seminar',
      'advertisement',
      'digital media',
      'classifieds',
      'others',
    ];
    this.statuses = ['open', 'lost', 'won'];

    this.getCategories();
    this.getCourses();

    this.leadForm = new FormGroup({
      leadName: new FormControl(null, { validators: [Validators.required] }),
      leadContact: new FormControl(null, {
        validators: [Validators.required, Validators.min(1000000000), Validators.max(9999999999)],
      }),
      leadEmail: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      course: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [] }),
      date: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      followUpDate: new FormControl(null, { validators: [Validators.required] }),
      strength: new FormControl(null, { validators: [Validators.required] }),
      mode: new FormControl(null, { validators: [Validators.required] }),
      source: new FormControl(null, { validators: [Validators.required] }),
      status: new FormControl(null, { validators: [Validators.required] }),
      comment: new FormControl(null, { validators: [Validators.required] }),
    });

    if (mode && this.leadId) {
      this.leadService.getLeadForEditing(this.leadId).subscribe(
        (res: any) => {
          this.lead = res;
          this.leadForm.patchValue({
            leadName: this.lead.leadName,
            leadEmail: this.lead.leadEmail,
            leadContact: this.lead.leadContact,
            category: this.lead.category,
            address: this.lead.address,
            date: this.lead.date,
            followUpDate: this.lead.followUpDate,
            status: this.lead.status,
            strength: this.lead.strength,
            mode: this.lead.mode,
            source: this.lead.source,
            comment: this.lead.comment,
          });

          this.onSelectCategory(this.lead.category);

          this.leadForm.patchValue({
            course: this.lead.course,
          });

          this.loading = false;
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.back();
        },
      );
    } else {
      this.loading = false;
    }
  }

  onSelectCategory(category: string) {
    this.myCourses = this.courses.filter(
      (course: CourseModel) => course.basicDetails.category === category,
    );
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
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    }
  }

  private getCourses() {
    this.courseService.getCoursesData().subscribe((courses: CourseModel[]) => {
      this.courses = courses;
    });
  }

  previousStep() {
    this.stepper.previous();
  }

  submitLeadForm() {
    this.leadForm.markAllAsTouched();
    if (this.leadForm.invalid) {
      this.showToastr('top-right', 'danger', 'Fill all Details Correctly');
      return;
    }
    this.stepper.next();
  }

  saveLead() {
    this.loading = true;
    this.leadForm.markAllAsTouched();
    if (this.leadForm.invalid) {
      this.showToastr('top-right', 'danger', 'Fill all Details Correctly');
      return;
    }

    const lead = this.leadForm.value;
    lead.branch = this.branchId;

    if (!this.lead) {
      this.leadService.saveLead(lead).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Lead Added Successfully!');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      lead._id = this.leadId;
      this.leadService.editLead(lead).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Lead Updated Successfully!');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    }
  }

  back() {
    const leadType = this.leadService.getLeadType();
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: { type: leadType } });
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

  ngOnDestroy() {
    this.leadService.deleteLeadId();
  }
}
