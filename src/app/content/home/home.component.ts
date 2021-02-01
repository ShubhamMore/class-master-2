import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $('.counter-count').each(function () {
      $(this)
        .prop('Counter', 0)
        .animate(
          {
            Counter: $(this).text(),
          },
          {
            duration: 5000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            },
          },
        );
    });
  }
}
