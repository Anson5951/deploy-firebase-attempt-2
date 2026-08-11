import { YoutubeComponent } from './components/youtube/youtube.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimateTriggerComponent } from './animate-trigger/animate-trigger.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoFiComponent } from './lo-fi/lo-fi.component';


@NgModule({
    declarations: [
        AppComponent,
        LoFiComponent,
        AnimateTriggerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        YoutubeComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
