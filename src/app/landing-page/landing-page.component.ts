import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  target: any;
  days: any
  hours: any
  mins: any
  secs: any

  ngOnInit(): void {
    // this.countDown();
  }

  countDown() {
    this.target = new Date('2026-06-07T07:00:00').getTime();
    setInterval(this.tick, 1000);
  }

  tick() {
    var now = Date.now();
    var diff = this.target - now;
    if (diff <= 0) {
      this.days.textContent = this.hours.textContent = this.mins.textContent = this.secs.textContent = '00';
      return;
    }
    // this.days.textContent = this.pad(Math.floor(diff / 86400000));
    // this.hours.textContent = this.pad(Math.floor((diff % 86400000) / 3600000));
    // this.mins.textContent = this.pad(Math.floor((diff % 3600000) / 60000));
    // this.secs.textContent = this.pad(Math.floor((diff % 60000) / 1000));
  }

  // pad(n: any) { return n < 10 ? '0' + n : '' + n; }
}
