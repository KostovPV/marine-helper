import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { CurrentJobComponent } from './current-job/current-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';

import {
    canActivate,
    redirectLoggedInTo,
    redirectUnauthorizedTo,
  } from '@angular/fire/auth-guard';
  const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
  const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);


const routes: Routes = [


    {
        path: 'list',
        component: JobsListComponent,
    },
    {
        path: 'list/:id',
        component: CurrentJobComponent,
    ...canActivate(redirectUnauthorizedToLogin),

    },
    {
        path: 'list/:id/edit',
        component: EditJobComponent,
    ...canActivate(redirectUnauthorizedToLogin),

    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JobsRoutingModule { }