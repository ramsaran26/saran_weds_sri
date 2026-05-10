import {
  Component, OnInit, OnDestroy,
  Inject, PLATFORM_ID, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface HeroSlide {
  image: string;
  alt:   string;
}

@Component({
  selector: 'app-landing-info',
  templateUrl: './landing-info.component.html',
  styleUrl: './landing-info.component.scss'
})
export class LandingInfoComponent {
slides: HeroSlide[] = [
    { image: '/silde_image_01.jpeg', alt: 'Srinidhi and Sarankarthick' },
    { image: '/silde_image_02.jpeg', alt: 'Together' },
    { image: '/silde_image_03.JPG', alt: 'Together' },
  ];

  activeIndex = 0;
  prevIndex   = -1;
  intervalMs  = 4000;       // 4 seconds per slide
  isRunning   = false;

  private timer!: ReturnType<typeof setInterval>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    this.isRunning = false;

    // tiny delay so progress bar CSS restarts cleanly
    setTimeout(() => { this.isRunning = true; }, 50);

    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.ngZone.run(() => this.nextSlide());
      }, this.intervalMs);
    });
  }

  private stopAutoPlay(): void {
    if (this.timer) clearInterval(this.timer);
    this.isRunning = false;
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  nextSlide(): void {
    this.prevIndex   = this.activeIndex;
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    this.resetAutoPlay();
  }

  prevSlide(): void {
    this.prevIndex   = this.activeIndex;
    this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length;
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    if (index === this.activeIndex) return;
    this.prevIndex   = this.activeIndex;
    this.activeIndex = index;
    this.resetAutoPlay();
  }
}
