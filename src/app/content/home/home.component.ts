import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cities: number;
  institutes: number;
  teachers: number;
  students: number;
  constructor() {}

  ngOnInit(): void {
    this.cities = 8;
    this.institutes = 237;
    this.teachers = 953;
    this.students = 2584;
  }
}
