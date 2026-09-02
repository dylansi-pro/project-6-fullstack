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
  styleUrl: './user-type-list.css'
})
export class UserTypeListComponent implements OnInit {

  userTypes: UserType[] = [];

  constructor(private userTypeService: UserTypeService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listUserTypes();
  }

  listUserTypes() {
    this.userTypeService.getUserTypes().subscribe(
      data => {
        console.log("Données reçues du backend :", data);
        this.userTypes = data;
        this.cdr.detectChanges();
      }
    );
  }

  deleteUserType(id: number) {
    if (confirm('Are you sure you want to delete this user-type?')) {
      this.userTypeService.deleteUserType(id).subscribe(
        () => {
          this.listUserTypes();
        }
      );
    }
  }
}
