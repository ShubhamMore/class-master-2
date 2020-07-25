import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  loading: boolean;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true;
  }
}
