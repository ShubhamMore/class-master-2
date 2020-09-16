import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSalaryRoutingModule } from './add-salary-routing.module';
import { AddSalaryComponent } from './add-salary.component';

@NgModule({
  declarations: [AddSalaryComponent],
  imports: [CommonModule, AddSalaryRoutingModule],
})
export class AddSalaryModule {}
