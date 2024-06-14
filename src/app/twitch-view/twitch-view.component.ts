import { Component } from '@angular/core';

@Component({
  selector: 'app-twitch-view',
  templateUrl: './twitch-view.component.html',
  styleUrls: ['./twitch-view.component.sass']
})
export class TwitchViewComponent {
  channelList: string[] = ['aesoon_96'];
  constructor(){}
  openChannel() {
    // new Twitch.Player("twitch-embed", {
    //   channel: "aesoon_96"
    // });
  }
}
