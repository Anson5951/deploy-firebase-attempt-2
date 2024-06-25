import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-eagle-feather-i',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './EagleFeather I.component.html',
  styleUrls: ['./EagleFeather I.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EagleFeatherIComponent { }
