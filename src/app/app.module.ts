import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingInfoComponent } from './landing-info/landing-info.component';
import { CountDownComponent } from './count-down/count-down.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { SaveTheDateComponent } from './save-the-date/save-the-date.component';
import { GlimpseComponent } from './glimpse/glimpse.component';
import { FooterComponent } from './footer/footer.component';
import { ScratchCardComponent } from './scratch-card/scratch-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LandingInfoComponent,
    CountDownComponent,
    OurStoryComponent,
    SaveTheDateComponent,
    GlimpseComponent,
    FooterComponent,
    ScratchCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
