import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimateTriggerComponent } from './animate-trigger/animate-trigger.component';
import { LoFiComponent } from './lo-fi/lo-fi.component';
import { YeahComponent } from './yeah/yeah.component';

const routes: Routes = [
  { path: 'lofi', component: LoFiComponent },
  { path: 'animate', component: AnimateTriggerComponent },
  { path: 'yeah', component: YeahComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
