import {
  Component, OnInit, Inject, PLATFORM_ID, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showOverlay = true;   // controls the welcome overlay visibility

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;  // SSR guard

    // Hide overlay and fire confetti after 800ms
    setTimeout(() => {
      this.launchConfetti();

      // Hide overlay smoothly after confetti starts
      setTimeout(() => {
        this.ngZone.run(() => this.showOverlay = false);
      }, 1800);

    }, 800);
  }

  private async launchConfetti(): Promise<void> {
    const confetti = (await import('canvas-confetti')).default;

    // ── Wave 1 — left cannon ──
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.65 },
      colors: ['#7B4F2E', '#A67C52', '#F5EFE6', '#C4A882', '#2C1A0E', '#EDE0D0'],
      scalar: 1.1,
      gravity: 0.9,
      drift: 0.5,
    });

    // ── Wave 2 — right cannon (slight delay) ──
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.65 },
        colors: ['#7B4F2E', '#A67C52', '#F5EFE6', '#C4A882', '#2C1A0E', '#EDE0D0'],
        scalar: 1.1,
        gravity: 0.9,
        drift: -0.5,
      });
    }, 200);

    // ── Wave 3 — center burst ──
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#7B4F2E', '#A67C52', '#F5EFE6', '#EDE0D0'],
        scalar: 0.9,
        gravity: 1,
        ticks: 300,
      });
    }, 450);

    // ── Wave 4 — slow romantic drift ──
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 90,
        spread: 180,
        origin: { x: 0.5, y: 0 },
        colors: ['#A67C52', '#C4A882', '#F5EFE6'],
        scalar: 0.75,
        gravity: 0.4,      // slow fall
        ticks: 500,        // stays longer
        drift: 1,
      });
    }, 700);
  }
}