import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../../common/user';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.cdr.detectChanges(); // Force le rendu immédiat de la liste
    });
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.users.sort((a: any, b: any) => {
      const valA = column === 'userType' ? a.userType?.type : a[column];
      const valB = column === 'userType' ? b.userType?.type : b[column];

      return (valA > valB ? 1 : valA < valB ? -1 : 0) * (this.sortDirection === 'asc' ? 1 : -1);
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.listUsers(); // Rafraîchir la liste après suppression
      });
    }
  }
}
