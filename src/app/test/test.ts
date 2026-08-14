import {
  Component,
  ElementRef,
  ViewChild,
  NgZone,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { YoutubeService } from './youtube.service';

interface LyricLine {
  time: number;
  text: string;
}

@Component({
  selector: 'app-lyric-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})
export class Test implements OnDestroy {
  videoId = 'dQw4w9WgXcQ';

  lyrics: LyricLine[] = [];
  currentIndex = -1;

  @ViewChild('lyricContainer')
  lyricContainer!: ElementRef<HTMLDivElement>;

  private timer: any;

  constructor(
    private http: HttpClient,
    public yt: YoutubeService,
    private zone: NgZone
  ) {}

  async ngOnInit() {
    // 先載入歌詞
    await this.loadCustomLyrics(this.videoId);

    // 初始化 YouTube
    await this.yt.loadApi();
    await this.yt.createPlayer('youtube-player', this.videoId);

    // 每 100ms 同步一次
    this.timer = setInterval(() => {
      this.zone.run(() => {
        this.syncLyrics();
      });
    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  async loadCustomLyrics(videoId: string) {
    const map = await firstValueFrom(
      this.http.get<Record<string, string>>('assets/lyric-map.json')
    );

    const file = map[videoId];

    if (!file) {
      this.lyrics = [{ time: 0, text: '沒有歌詞' }];
      return;
    }

    const lrc = await firstValueFrom(
      this.http.get(file, { responseType: 'text' })
    );

    this.lyrics = this.parseLRC(lrc);
  }

  parseLRC(lrc: string): LyricLine[] {
    return lrc
      .split('\n')
      .map(line => {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (!match) return null;

        return {
          time: Number(match[1]) * 60 + Number(match[2]),
          text: match[3].trim()
        };
      })
      .filter(Boolean) as LyricLine[];
  }

  syncLyrics() {
    const currentTime = this.yt.getCurrentTime();

    let index = -1;

    for (let i = 0; i < this.lyrics.length; i++) {
      if (currentTime + 1.4 >= this.lyrics[i].time) {
        index = i;
      } else {
        break;
      }
    }

    if (index !== this.currentIndex) {
      this.currentIndex = index;
      this.scrollToCurrent();
    }
  }

  scrollToCurrent() {
    if (!this.lyricContainer) return;

    const container = this.lyricContainer.nativeElement;
    const current = container.children[this.currentIndex] as HTMLElement;

    if (current) {
      current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
}
