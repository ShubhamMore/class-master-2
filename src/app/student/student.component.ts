import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'ngx-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.loading = true;
  }
}
