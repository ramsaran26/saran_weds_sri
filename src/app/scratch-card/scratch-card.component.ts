import {
  Component, AfterViewInit, ViewChild, ElementRef,
  Inject, PLATFORM_ID, Input
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scratch-card',
  templateUrl: './scratch-card.component.html',
  styleUrls: ['./scratch-card.component.scss']
})
export class ScratchCardComponent implements AfterViewInit {

  @Input() revealText: string = 'June 07, 2026 · Chinnammanur, Theni';
  @Input() coverText: string  = 'Scratch to reveal ✦';

  @ViewChild('scratchCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private isRevealed = false;
  revealedPercent = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;  // SSR guard
    this.initCanvas();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx    = canvas.getContext('2d')!;
    this.ctx     = ctx;

    // Match canvas size to its CSS size
    const rect   = canvas.getBoundingClientRect();
    canvas.width  = rect.width  || 280;
    canvas.height = rect.height || 40;

    // ── Draw scratch cover layer ──
    ctx.fillStyle = '#7B4F2E';             // --gold (dark brown)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Shimmer effect on cover
    const shimmer = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    shimmer.addColorStop(0,    'rgba(255,255,255,0.05)');
    shimmer.addColorStop(0.5,  'rgba(255,255,255,0.18)');
    shimmer.addColorStop(1,    'rgba(255,255,255,0.05)');
    ctx.fillStyle = shimmer;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cover label text
    ctx.fillStyle    = 'rgba(245, 239, 230, 0.85)';
    ctx.font         = '500 11px Jost, sans-serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText(
      this.coverText.toUpperCase(),
      canvas.width / 2,
      canvas.height / 2
    );

    // ── Pointer events ──
    this.bindEvents(canvas);
  }

  private bindEvents(canvas: HTMLCanvasElement): void {
    // Mouse
    canvas.addEventListener('mousedown', (e) => { this.isDrawing = true; this.scratch(e); });
    canvas.addEventListener('mousemove', (e) => { if (this.isDrawing) this.scratch(e); });
    canvas.addEventListener('mouseup',   ()  => { this.isDrawing = false; this.checkReveal(); });
    canvas.addEventListener('mouseleave',()  => { this.isDrawing = false; });

    // Touch
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); this.isDrawing = true; this.scratchTouch(e); }, { passive: false });
    canvas.addEventListener('touchmove',  (e) => { e.preventDefault(); if (this.isDrawing) this.scratchTouch(e); }, { passive: false });
    canvas.addEventListener('touchend',   ()  => { this.isDrawing = false; this.checkReveal(); });
  }

  private getPos(e: MouseEvent): { x: number; y: number } {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  private getTouchPos(e: TouchEvent): { x: number; y: number } {
    const rect  = this.canvasRef.nativeElement.getBoundingClientRect();
    const touch = e.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  private scratch(e: MouseEvent): void {
    this.erase(this.getPos(e));
  }

  private scratchTouch(e: TouchEvent): void {
    this.erase(this.getTouchPos(e));
  }

  private erase(pos: { x: number; y: number }): void {
    const ctx        = this.ctx;
    ctx.globalCompositeOperation = 'destination-out'; // erases pixels
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);       // brush size = 18px
    ctx.fill();
  }

  private checkReveal(): void {
    if (this.isRevealed) return;

    const canvas  = this.canvasRef.nativeElement;
    const pixels  = this.ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared   = 0;

    // Count transparent pixels (alpha === 0)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) cleared++;
    }

    const total   = canvas.width * canvas.height;
    this.revealedPercent = Math.round((cleared / total) * 100);

    // Auto-complete when 45% is scratched
    if (this.revealedPercent >= 45) {
      this.completeReveal();
    }
  }

  completeReveal(): void {
    if (this.isRevealed) return;
    this.isRevealed = true;

    const canvas = this.canvasRef.nativeElement;

    // Fade out canvas overlay
    canvas.style.transition = 'opacity 0.6s ease';
    canvas.style.opacity    = '0';

    setTimeout(() => {
      canvas.style.display = 'none';
    }, 600);
  }
}