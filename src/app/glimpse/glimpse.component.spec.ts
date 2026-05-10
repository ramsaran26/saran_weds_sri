import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlimpseComponent } from './glimpse.component';

describe('GlimpseComponent', () => {
  let component: GlimpseComponent;
  let fixture: ComponentFixture<GlimpseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlimpseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlimpseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
