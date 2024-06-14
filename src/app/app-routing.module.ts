import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimateTriggerComponent } from './animate-trigger/animate-trigger.component';
import { DiceComponent } from './dice/dice.component';
import { LoFiComponent } from './lo-fi/lo-fi.component';
import { TwitchViewComponent } from './twitch-view/twitch-view.component';
import { YeahComponent } from './yeah/yeah.component';

const routes: Routes = [
  { path: 'lofi', component: LoFiComponent },
  { path: 'twitch', component: TwitchViewComponent },
  { path: 'dice', component: DiceComponent },
  { path: 'animate', component: AnimateTriggerComponent },
  { path: 'yeah', component: YeahComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
