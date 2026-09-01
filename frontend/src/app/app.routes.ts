import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list';
import { UserTypeListComponent } from './components/user-type-list/user-type-list';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'user-types', component: UserTypeListComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' }
];
