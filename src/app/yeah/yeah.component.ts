import { Component, ViewChild, OnInit } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
    selector: 'app-yeah',
    templateUrl: './yeah.component.html',
    styleUrls: ['./yeah.component.css']
})
export class YeahComponent implements OnInit {

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
}
