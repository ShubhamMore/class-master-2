import { MenuService } from './menu.service';
import { NgModule } from '@angular/core';
import {
  NbMenuModule,
  NbCardModule,
  NbUserModule,
  NbButtonModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbInputModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbStepperModule,
  NbFormFieldModule,
  NbAutocompleteModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { InstituteComponent } from './institute.component';
import { InstituteRoutingModule } from './institute-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MyInstitutesComponent } from './my-institutes/my-institutes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembershipPlansComponent } from './membership-plans/membership-plans.component';
import { ManageInstituteComponent } from './manage-institute/manage-institute.component';
import { AddInstituteComponent } from './manage-institute/add-institute/add-institute.component';
import { ViewInstituteComponent } from './manage-institute/view-institute/view-institute.component';

@NgModule({
  imports: [
    InstituteRoutingModule,
    ThemeModule,
    NbMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbUserModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbDatepickerModule,
    NbStepperModule,
    NbFormFieldModule,
    NbAutocompleteModule,
  ],
  declarations: [
    InstituteComponent,
    ProfileComponent,
    HomeComponent,
    MyInstitutesComponent,
    MembershipPlansComponent,
    ManageInstituteComponent,
    AddInstituteComponent,
    ViewInstituteComponent,
  ],
  providers: [MenuService],
})
export class InstituteModule {}
