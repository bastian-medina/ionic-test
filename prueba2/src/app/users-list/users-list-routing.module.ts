import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListPage } from './users-list.page';

const routes: Routes = [
  {
    path: '',
    component: UsersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersListPageRoutingModule {}
