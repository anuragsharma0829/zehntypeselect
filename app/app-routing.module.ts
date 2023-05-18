import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { ZehnselectComponent } from './zehnselect/zehnselect.component';
import { DrpdownComponent } from './drpdownn/drpdown/drpdown.component';

const routes: Routes = [

  {
    path: '',
    component: ZehnselectComponent
  },

  {
    path:'demo',
    component:DrpdownComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
