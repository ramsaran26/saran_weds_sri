import {
  Component, OnInit, OnDestroy, AfterViewInit,
  Inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrl: './our-story.component.scss'
})
export class OurStoryComponent  implements AfterViewInit, OnDestroy {

  private observer!: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;   // SSR guard

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after reveal — animate once, no reverse
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,       // trigger when 20% of element is visible
        rootMargin: '0px 0px -60px 0px'  // trigger slightly before bottom edge
      }
    );

    // Observe all reveal targets
    const targets = document.querySelectorAll('.reveal, .tl-content');
    targets.forEach(el => this.observer.observe(el));
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
