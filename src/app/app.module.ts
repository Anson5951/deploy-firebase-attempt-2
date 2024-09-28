import { YoutubeComponent } from './components/youtube/youtube.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AnimateTriggerComponent } from './animate-trigger/animate-trigger.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoFiComponent } from './lo-fi/lo-fi.component';
import { YeahComponent } from './yeah/yeah.component';

@NgModule({
  declarations: [
    AppComponent,
    LoFiComponent,
    AnimateTriggerComponent,
    YeahComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
    YoutubeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
