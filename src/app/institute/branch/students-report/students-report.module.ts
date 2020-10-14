import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsReportRoutingModule } from './students-report-routing.module';
import { StudentsReportComponent } from './students-report.component';

@NgModule({
  declarations: [StudentsReportComponent],
  imports: [CommonModule, StudentsReportRoutingModule],
})
export class StudentsReportModule {}
