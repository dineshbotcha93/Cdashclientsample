import { NgModule, Component } from '@angular/core';
import { BusinessComponent } from './business.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { ComponentsModule } from '../shared/components';
import { ContainersModule } from '../shared/containers';
import { ChartsModule } from 'ng2-charts';
import { FormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

export const routes: Routes = [
    {
        path: 'business',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: BusinessComponent
            },
            {
                path: ':customer-list/:status',
                loadChildren: './customer-list/customer-list.module#CustomerListModule'
            },
            {
               path: ':customer-details/:id/:view',
               loadChildren: './customer-details/customer-details.module#CustomerDetailsModule'
            }
        ]
    },
];
@NgModule({
    declarations: [
        BusinessComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
    ],
    imports: [
        RouterModule.forRoot(routes),
        CommonModule,
        ComponentsModule,
        ContainersModule,
        ChartsModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
    ],
})

export class BusinessModule { }
