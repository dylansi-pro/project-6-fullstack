import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../../common/user-type';
import { UserTypeService } from '../../services/user-type';

@Component({
  selector: 'app-user-type-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-type-list.html',
  styleUrl: './user-type-list.css'
})
export class UserTypeListComponent implements OnInit {

  userTypes: UserType[] = [];

  constructor(private userTypeService: UserTypeService) { }

  ngOnInit(): void {
    this.listUserTypes();
  }

  listUserTypes() {
    this.userTypeService.getUserTypes().subscribe(
      data => {
        this.userTypes = data;
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
