import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-eagle-feather-ii',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './EagleFeather II.component.html',
  styleUrls: ['./EagleFeather II.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EagleFeatherIIComponent { }
