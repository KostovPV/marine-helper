import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    trigger('fade', [

      transition('void=>*', [
        style({ opacity: 0 }),
        animate(3000, style({ opacity: 1 }))
      ]),
      transition('*=>void', [
        animate(2000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit {
  show = false;
  text = 'Show more';
  
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.show = !this.show;
    this.show? this.text='Show less' : this.text='Show more'
  }

}
