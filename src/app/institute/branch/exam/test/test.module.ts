import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { AddTestComponent } from './add-test/add-test.component';
import { AddTestScoreComponent } from './add-test-score/add-test-score.component';


@NgModule({
  declarations: [TestComponent, ManageTestComponent, AddTestComponent, AddTestScoreComponent],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
