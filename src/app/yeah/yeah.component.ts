import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
    selector: 'app-yeah',
    templateUrl: './yeah.component.html',
    styleUrls: ['./yeah.component.css']
})
export class YeahComponent implements OnInit {

    layoutSelectorVisibility = false

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        console.log('KeyboardEvent',event);
        if (event.key == '`') {
            this.layoutSelectorVisibility = !this.layoutSelectorVisibility;
        }
    }

    // readonly vedioIds: string[] = [
    //     'NajJFMnGMf0',
    //     'PJH2AscfsNc',
    //     'IXdszpdqzec',
    //     'SWEyHRr12Jo',
    // ]
    // readonly playerVars: YT.PlayerVars = {
    //     autoplay: 1,
    //     loop: 0,
    // }
    // playerVarsList: YT.PlayerVars[] = [];

    ngOnInit(): void {
        // this.playerVarsList = this.vedioIds.map(x => ({
        //     ...this.playerVars,
        //     playlist: x
        // }) as YT.PlayerVars)
    }

    layoutSelection_onClick(layout: 'quarter' | 'heigh' | 'wide') {
        switch (layout) {
            case 'quarter':
                break;
            case 'heigh':
                break;
            case 'wide':
                break;
        }
    }
}
