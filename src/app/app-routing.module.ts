import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimateTriggerComponent } from './animate-trigger/animate-trigger.component';
import { LoFiComponent } from './lo-fi/lo-fi.component';
import { YeahComponent } from './yeah/yeah.component';
import { NovelComponent } from './novel/novel.component';
import { AbletonComponent } from './frontend-practice/Ableton/Ableton.component';
import { JapanSongsComponent } from './lyrics/JapanSongs/JapanSongs.component';


const routes: Routes = [
  { path: 'lofi', component: LoFiComponent },
  { path: 'animate', component: AnimateTriggerComponent },
  { path: 'yeah', component: YeahComponent },
  { path: 'novel', component: NovelComponent },
  { path: 'ableton', component: AbletonComponent },
  { path: 'lyrics', component: JapanSongsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
