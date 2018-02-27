import { NgModule } from '@angular/core';
import { FillDetailsComponent } from './fill-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path:'',component: FillDetailsComponent
}];

@NgModule({
  declarations: [FillDetailsComponent],
  imports:[
    RouterModule.forChild(routes)
  ]
})

export class FillDetailsModule {}
