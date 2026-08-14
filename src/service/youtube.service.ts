import { Injectable } from '@angular/core';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

@Injectable({
    providedIn: 'root'
})
export class YoutubeService {

    private player: any = null;

    private apiReadyPromise: Promise<void> | null = null;

    /**
     * Player Ready Promise
     */
    private playerReadyPromise: Promise<void> | null = null;

    /**
     * 載入 YouTube IFrame API
     */
    loadApi(): Promise<void> {

        // API 已經載入
        if (window.YT && window.YT.Player) {
            return Promise.resolve();
        }

        // API 正在載入
        if (this.apiReadyPromise) {
            return this.apiReadyPromise;
        }

        this.apiReadyPromise = new Promise<void>((resolve) => {

            window.onYouTubeIframeAPIReady = () => {
                resolve();
            };

            const script = document.createElement('script');

            script.src =
                'https://www.youtube.com/iframe_api';

            script.async = true;

            document.body.appendChild(script);
        });

        return this.apiReadyPromise;
    }

    /**
     * 建立 YouTube Player
     *
     * ★ 注意：
     * 這個 Promise 會等到 onReady 才 resolve
     */
    async createPlayer(
        elementId: string,
        videoId: string,
        onStateChange?: (state: number) => void,
        onReady?: () => void
    ): Promise<void> {

        await this.loadApi();

        this.playerReadyPromise =
            new Promise<void>((resolve) => {

                this.player =
                    new window.YT.Player(
                        elementId,
                        {
                            width: '100%',
                            height: '100%',

                            videoId,

                            playerVars: {
                                autoplay: 0,
                                controls: 1,
                                rel: 0,
                                modestbranding: 1
                            },

                            events: {

                                onReady: () => {

                                    console.log(
                                        'YouTube Player Ready'
                                    );

                                    /**
                                     * ★ 先 resolve
                                     */
                                    resolve();

                                    /**
                                     * 再通知 Component
                                     */
                                    onReady?.();
                                },

                                onStateChange: (
                                    event: any
                                ) => {

                                    onStateChange?.(
                                        event.data
                                    );
                                }
                            }
                        }
                    );
            });

        /**
         * ★ 真正等待 Player Ready
         */
        await this.playerReadyPromise;
    }

    /**
     * 播放
     */
    play(): void {

        if (!this.player) {
            console.warn(
                'YouTube Player 尚未建立'
            );

            return;
        }

        this.player.playVideo();
    }

    /**
     * 暫停
     */
    pause(): void {

        if (!this.player) {
            return;
        }

        this.player.pauseVideo();
    }

    /**
     * 跳到指定秒數
     */
    seekTo(time: number): void {

        if (!this.player) {

            console.warn(
                'YouTube Player 尚未建立'
            );

            return;
        }

        this.player.seekTo(
            time,
            true
        );
    }

    /**
     * 取得目前播放時間
     */
    getCurrentTime(): number {

        if (!this.player) {
            return 0;
        }

        return this.player.getCurrentTime();
    }

    /**
     * 取得播放狀態
     */
    getPlayerState(): number {

        if (!this.player) {
            return -1;
        }

        return this.player.getPlayerState();
    }

    /**
     * 是否正在播放
     */
    isPlaying(): boolean {

        if (!this.player) {
            return false;
        }

        return (
            this.player.getPlayerState() ===
            window.YT.PlayerState.PLAYING
        );
    }

    /**
     * 載入另一部影片
     */
    loadVideo(videoId: string): void {

        if (!this.player) {
            console.warn(
                'YouTube Player 尚未建立'
            );

            return;
        }

        this.player.loadVideoById(
            videoId
        );
    }

    /**
     * 銷毀
     */
    destroy(): void {

        if (this.player) {

            this.player.destroy();

            this.player = null;
        }

        this.playerReadyPromise = null;
    }
}
