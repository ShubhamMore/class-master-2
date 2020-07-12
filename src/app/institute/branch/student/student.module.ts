import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddStudentComponent } from './add-student/add-student.component';

@NgModule({
  declarations: [StudentComponent, AddStudentComponent],
  imports: [CommonModule, StudentRoutingModule],
})
export class StudentModule {}
