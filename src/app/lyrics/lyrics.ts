import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { YoutubeService } from 'src/service/youtube.service';

interface LyricLine {
    time: number;
    text: string;
    html?: string;
}

interface LyricConfig {
    [videoId: string]: {
        lyrics: string;
        tolerance: number;
    };
}

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lyrics.html',
    styleUrls: ['./lyrics.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Lyrics implements AfterViewInit, OnDestroy {

    @ViewChild('youtubePlayer')
    youtubePlayerRef?: ElementRef<HTMLDivElement>;

    videoId = 'BwASeebfkx4';
    lyrics: LyricLine[] = [];
    currentIndex = -1;
    currentTime = 0;
    tolerance = 0.0;
    private lyricMapPath = 'assets/lyric-map.json';
    private syncTimer?: ReturnType<typeof setInterval>;
    public youtubeReady = false;
    private lastScrolledIndex = -1;

    constructor(
        private http: HttpClient,
        public youtubeService: YoutubeService,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone
    ) { }

    async ngAfterViewInit(): Promise<void> {
        await this.loadLyrics();
        await this.initYoutube();
    }

    ngOnDestroy(): void {
        this.stopSyncTimer();
        this.youtubeService.destroy();
    }

    private async loadLyrics(): Promise<void> {
        try {
            const config = await firstValueFrom(
                this.http.get<LyricConfig>(
                    this.lyricMapPath
                )
            );

            const videoConfig = config[this.videoId];

            if (!videoConfig) {
                console.warn(`找不到 ${this.videoId} 的歌詞`);
                this.lyrics = [{ text: "目前尚未提供此影片歌詞", time: 0 }];
                this.cdr.markForCheck();
                return;
            }

            const lyricPath = videoConfig.lyrics;
            this.tolerance = videoConfig.tolerance;

            const lrc = await firstValueFrom(
                this.http.get(lyricPath, { responseType: 'text' }
                )
            );

            this.lyrics = this.parseLrc(lrc);
            console.log('Lyrics:', this.lyrics);
            this.cdr.markForCheck();

        } catch (error) {
            console.error('載入歌詞失敗', error);
            this.lyrics = [];
            this.cdr.markForCheck();
        }
    }

    private convertRubyFormat(text: string): string {
        return text.replace(/\{([^|]+)\|([^}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>');
    }

    private parseLrc(lrc: string): LyricLine[] {

        const result: LyricLine[] = [];
        const lines = lrc.split(/\r?\n/);

        for (const line of lines) {
            const match = line.match(
                /^\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\](.*)$/
            );

            if (!match) {
                continue;
            }

            const minutes = Number(match[1]);
            const seconds = Number(match[2]);
            let milliseconds = 0;

            if (match[3]) {
                const decimal = match[3];
                if (decimal.length === 1) {
                    milliseconds = Number(decimal) * 100;
                } else if (
                    decimal.length === 2
                ) {
                    milliseconds = Number(decimal) * 10;
                } else {
                    milliseconds = Number(decimal);
                }
            }

            const time = minutes * 60 + seconds + milliseconds / 1000;

            const text = match[4].trim();
            const html = this.convertRubyFormat(text);

            result.push({ time, text, html });
        }

        result.sort((a, b) => a.time - b.time);

        return result;
    }

    private async initYoutube(): Promise<void> {
        const playerElement = this.youtubePlayerRef?.nativeElement;
        const playerId = playerElement?.id || 'youtube-player';

        if (playerElement && !playerElement.id) {
            playerElement.id = playerId;
        }

        this.youtubeReady = false;

        await this.youtubeService.createPlayer(
            playerId,
            this.videoId,
            (state: number) => { this.onYoutubeStateChange(state); },
            () => {
                console.log('Component: YouTube Ready');
                this.youtubeReady = true;
                this.cdr.markForCheck();
            }
        );

        this.youtubeReady = true;
        this.cdr.markForCheck();
    }

    private onYoutubeStateChange(state: number): void {

        if (state === window.YT.PlayerState.PLAYING) {
            this.startSyncTimer();
            return;
        }

        if (state === window.YT.PlayerState.PAUSED) {
            this.stopSyncTimer();
            this.updateCurrentLyric();
            return;
        }

        if (state === window.YT.PlayerState.ENDED) {
            this.stopSyncTimer();
            this.updateCurrentLyric();
        }
    }

    private startSyncTimer(): void {
        this.stopSyncTimer();
        this.syncTimer = setInterval(() => {
            this.updateCurrentLyric();
        }, 100);
    }

    private stopSyncTimer(): void {
        if (this.syncTimer) {
            clearInterval(this.syncTimer);
            this.syncTimer = undefined;
        }
    }

    onToleranceInput(event: Event): void {
        const value = Number((event.target as HTMLInputElement).value);
        this.tolerance = Number.isFinite(value) ? value : 0;
        this.updateCurrentLyric();
    }

    private updateCurrentLyric(): void {

        if (!this.youtubeReady) {
            return;
        }

        const time = this.youtubeService.getCurrentTime();
        this.currentTime = time;
        const index = this.findCurrentLyricIndex(time);

        if (index === this.currentIndex) {
            return;
        }

        this.ngZone.run(() => {
            this.currentIndex = index;
            this.cdr.markForCheck();
            this.scrollToCurrentLyric();
        });
    }

    private findCurrentLyricIndex(time: number): number {

        if (this.lyrics.length === 0) {
            return -1;
        }

        for (let i = this.lyrics.length - 1; i >= 0; i--) {
            const lyricTime = this.lyrics[i].time;

            if (time >= lyricTime - this.tolerance) {
                return i;
            }
        }

        return 0;
    }

    seekToLyric(lyric: LyricLine): void {

        if (!this.youtubeReady) {
            console.warn('YouTube 尚未 Ready');
            return;
        }
        const time = lyric.time - this.tolerance;
        console.log(`跳轉到 ${time}s`, lyric.text);
        this.youtubeService.seekTo(time);
        this.youtubeService.play();
        this.ngZone.run(() => {
            this.currentTime = time;
            this.currentIndex = this.findCurrentLyricIndex(time);
            this.cdr.markForCheck();
            this.scrollToCurrentLyric();
        });
    }
    private scrollToCurrentLyric(): void {
        if (this.currentIndex < 0) {
            return;
        }
        if (this.lastScrolledIndex === this.currentIndex) {
            return;
        }
        this.lastScrolledIndex = this.currentIndex;

        setTimeout(() => {
            const element = document.querySelector(
                '.lyric-line.active'
            ) as HTMLElement | null;

            if (!element) {
                return;
            }
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 0);
    }
    play(): void {
        this.youtubeService.play();
    }

    pause(): void {
        this.youtubeService.pause();
    }
    async changeVideo(
        videoId: string
    ): Promise<void> {
        this.stopSyncTimer();
        this.youtubeReady = false;
        this.videoId = videoId;
        this.lyrics = [];
        this.currentIndex = -1;
        this.currentTime = 0;
        this.lastScrolledIndex = -1;

        await this.loadLyrics();

        this.youtubeService.loadVideo(
            this.videoId
        );

        this.cdr.markForCheck();
    }

    async reloadLyrics(): Promise<void> {
        this.currentIndex = -1;
        this.currentTime = 0;
        this.lastScrolledIndex = -1;
        await this.loadLyrics();
        this.updateCurrentLyric();
    }
}
