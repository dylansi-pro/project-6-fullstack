import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { UserFormComponent } from './user-form';
import { UserService } from '../../services/user';
import { UserTypeService } from '../../services/user-type';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUserById: () => of({}),
            createUser: () => of({}),
            updateUser: () => of({}),
          },
        },
        {
          provide: UserTypeService,
          useValue: {
            getUserTypes: () => of([]),
          },
        },
        {
          provide: Router,
          useValue: { navigate: () => Promise.resolve(true) },
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
