import { Component, OnInit, NgZone, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.scss'
})
export class CountDownComponent {
   days = 0;
  hours = 0;
  mins = 0;
  secs = 0;

  interval: any;

  weddingDate = new Date('2026-06-07T06:30:00+05:30');

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    // VERY IMPORTANT
    if (isPlatformBrowser(this.platformId)) {
      this.startCountdown();
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startCountdown(): void {

    this.updateCountdown();

    this.interval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown(): void {

    const now = new Date().getTime();
    const target = this.weddingDate.getTime();

    const difference = target - now;

    if (difference <= 0) {
      clearInterval(this.interval);
      return;
    }

    this.days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    this.hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    this.mins = Math.floor(
      (difference % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    this.secs = Math.floor(
      (difference % (1000 * 60)) / 1000
    );
  }
}