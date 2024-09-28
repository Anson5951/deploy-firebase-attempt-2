import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ableton',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Ableton.component.html',
  styleUrls: ['./Ableton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbletonComponent implements OnInit, AfterViewInit {

  a = {
    title: 'asd',
    date: new Date(123),
    array: ['Steve']
  }

  b: any;

  ngOnInit(): void {
    this.b = structuredClone(this.a);
    this.b.array.push('asdasd')
  }

  ngAfterViewInit() {
  }

}
