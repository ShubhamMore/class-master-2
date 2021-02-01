import {
  NbIconModule,
  NbSpinnerModule,
  NbSelectModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { SaveStoragePackageComponent } from './save-storage-package/save-storage-package.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoragePackagesRoutingModule } from './storage-packages-routing.module';
import { StoragePackagesComponent } from './storage-packages.component';

@NgModule({
  declarations: [StoragePackagesComponent, SaveStoragePackageComponent],
  imports: [
    CommonModule,
    StoragePackagesRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbSpinnerModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
})
export class StoragePackagesModule {}
