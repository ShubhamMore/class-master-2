import { NbCardModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    NbCardModule,
    NbIconModule,
    NbActionsModule,
  ],
})
export class HomeModule {}
