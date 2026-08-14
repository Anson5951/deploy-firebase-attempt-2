import { Injectable } from '@angular/core';

declare var YT: any;

@Injectable({
    providedIn: 'root'
})
export class YoutubeService {
    player: any;

    loadApi(): Promise<void> {
        return new Promise(resolve => {
            if ((window as any).YT) {
                resolve();
                return;
            }

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(tag);

            (window as any).onYouTubeIframeAPIReady = () => resolve();
        });
    }

    createPlayer(elementId: string, videoId: string): Promise<void> {
        return new Promise(resolve => {
            this.player = new YT.Player(elementId, {
                width: '640',
                height: '390',
                videoId,
                events: {
                    onReady: () => resolve()
                }
            });
        });
    }

    getCurrentTime(): number {
        return this.player?.getCurrentTime() || 0;
    }

    loadVideo(videoId: string) {
        this.player?.loadVideoById(videoId);
    }
}
