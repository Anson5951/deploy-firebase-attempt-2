import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoFiComponent } from './lo-fi/lo-fi.component';

const routes: Routes = [
  { path: 'lofi', component: LoFiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
