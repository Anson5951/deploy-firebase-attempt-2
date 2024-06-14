import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-yeah',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './yeah.component.html',
  styleUrls: ['./yeah.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YeahComponent { }
