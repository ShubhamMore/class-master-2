import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBatchScheduleComponent } from './manage-batch-schedule.component';

const routes: Routes = [{ path: '', component: ManageBatchScheduleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageBatchScheduleRoutingModule {}
