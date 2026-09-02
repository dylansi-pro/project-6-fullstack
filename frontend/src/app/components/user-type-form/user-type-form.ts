import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserType } from '../../common/user-type';
import { UserTypeService } from '../../services/user-type';

@Component({
  selector: 'app-user-type-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-type-form.html',
  styleUrl: './user-type-form.css'
})
export class UserTypeFormComponent implements OnInit {

  userType: UserType = new UserType(null as any, '');
  isEditMode = false;

  constructor(
    private userTypeService: UserTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userTypeService.getUserTypeById(+id).subscribe(data => {
        this.userType = data;
      });
    }
  }

  saveUserType() {
    if (this.isEditMode) {
      this.userTypeService.updateUserType(this.userType).subscribe(() => {
        this.router.navigate(['/user-types']);
      });
    } else {
      this.userTypeService.createUserType(this.userType).subscribe(() => {
        this.router.navigate(['/user-types']);
      });
    }
  }
}
