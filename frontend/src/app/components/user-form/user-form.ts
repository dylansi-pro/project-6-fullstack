import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../common/user';
import { UserType } from '../../common/user-type';
import { UserService } from '../../services/user';
import { UserTypeService } from '../../services/user-type';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserFormComponent implements OnInit {
  user: User = new User(undefined, '', '', new UserType(null as any, ''));
  userTypes: UserType[] = [];
  isEditMode = false;

  constructor(
    private userService: UserService,
    private userTypeService: UserTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Charger la liste des types pour le select du formulaire
    this.userTypeService.getUserTypes().subscribe((data) => {
      this.userTypes = data;
      this.cdr.detectChanges();
    });

    // Vérifier si on est en mode édition ou ajout via l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userService.getUserById(+id).subscribe((data) => {
        this.user = data;
        this.cdr.detectChanges();
      });
    }
  }

  saveUser() {
    this.user.firstName = this.user.firstName.trim();
    this.user.lastName = this.user.lastName.trim();
    if (!this.user.firstName || !this.user.lastName || !this.user.userType) {
      return;
    }

    if (!this.user.id || this.user.id === 0) {
      this.user.id = undefined;
    }

    if (this.isEditMode) {
      this.userService.updateUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
