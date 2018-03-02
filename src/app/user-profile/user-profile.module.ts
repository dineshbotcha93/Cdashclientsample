import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { ContainersModule} from '../shared/containers';
import {ComponentsModule} from '../shared/components';
import { FormsModule} from '@angular/forms';

const routes: Routes = [
{
  path: 'user-profile',
 // canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: UserProfileComponent
    }
  ]
}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    ContainersModule,
    ComponentsModule,
    FormsModule
  ],
  declarations: [UserProfileComponent],
  providers: [
    AuthGuard,
    AuthService,
]
})
export class UserProfileModule { }