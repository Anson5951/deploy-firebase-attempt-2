import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'lofi', loadComponent: () => import('./lo-fi/lo-fi.component').then(m => m.LoFiComponent) },
  { path: 'animate', loadComponent: () => import('./animate-trigger/animate-trigger.component').then(m => m.AnimateTriggerComponent) },
  { path: 'yeah', loadComponent: () => import('./yeah/yeah.component').then(m => m.YeahComponent) },
  { path: 'novel', loadComponent: () => import('./novel/novel.component').then(m => m.NovelComponent) },
  { path: 'ableton', loadComponent: () => import('./frontend-practice/Ableton/Ableton.component').then(m => m.AbletonComponent) },
  { path: 'lyrics', loadComponent: () => import('./lyrics/JapanSongs/JapanSongs.component').then(m => m.JapanSongsComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
