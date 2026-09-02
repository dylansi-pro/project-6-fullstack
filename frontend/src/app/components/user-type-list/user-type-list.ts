import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../../common/user-type';
import { UserTypeService } from '../../services/user-type';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-type-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-type-list.html',
  styleUrl: './user-type-list.css',
})
export class UserTypeListComponent implements OnInit {
  userTypes: UserType[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private userTypeService: UserTypeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.listUserTypes();
  }

  listUserTypes() {
    this.userTypeService.getUserTypes().subscribe((data) => {
      console.log('Données reçues du backend :', data);
      this.userTypes = data;
      this.cdr.detectChanges();
    });
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.userTypes.sort((a: any, b: any) => {
      const valA = a[column];
      const valB = b[column];

      return (valA > valB ? 1 : valA < valB ? -1 : 0) * (this.sortDirection === 'asc' ? 1 : -1);
    });
  }

  deleteUserType(id: number) {
    if (confirm('Are you sure you want to delete this user-type?')) {
      this.userTypeService.deleteUserType(id).subscribe(() => {
        this.listUserTypes();
      });
    }
  }
}
