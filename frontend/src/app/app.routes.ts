import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list';
import { UserTypeListComponent } from './components/user-type-list/user-type-list';
import {UserFormComponent} from './components/user-form/user-form';
import {UserTypeFormComponent} from './components/user-type-form/user-type-form';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'user-types/add', component: UserTypeFormComponent },
  { path: 'user-types/edit/:id', component: UserTypeFormComponent },
  { path: 'user-types', component: UserTypeListComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' }
];
