import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-japan-songs',
  standalone: true,
  imports: [],
  templateUrl: './JapanSongs.component.html',
  styleUrls: ['./JapanSongs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JapanSongsComponent { }
