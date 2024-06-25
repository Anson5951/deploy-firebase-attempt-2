import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EagleFeatherIComponent } from './EagleFeather I/EagleFeather I.component';
import { EagleFeatherIIComponent } from './EagleFeather II/EagleFeather II.component';

@Component({
  selector: 'app-novel',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    EagleFeatherIComponent,
    EagleFeatherIIComponent,
  ],
  templateUrl: './novel.component.html',
  styleUrls: ['./novel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovelComponent implements OnInit, AfterViewInit, AfterViewChecked {

  langs: any[] = [];

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked(): void {
  }

  test() {
    const synth = window.speechSynthesis;
    const voice = synth.getVoices().find(x => x.name == 'Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)')

    let utterance = new SpeechSynthesisUtterance("Hello world!");
    if (voice != null)
      utterance.voice = voice;
    speechSynthesis.speak(utterance);
  }
}
