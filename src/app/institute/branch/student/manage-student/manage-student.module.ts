import { PassoutStudentComponent } from './passout-student/passout-student.component';
import { ManageStudentComponent } from './manage-student.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStudentRoutingModule } from './manage-student-routing.module';
import { ActiveStudentComponent } from './active-student/active-student.component';

@NgModule({
  declarations: [ManageStudentComponent, ActiveStudentComponent, PassoutStudentComponent],
  imports: [CommonModule, ManageStudentRoutingModule],
})
export class ManageStudentModule {}
