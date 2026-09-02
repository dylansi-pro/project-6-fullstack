import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { UserTypeFormComponent } from './user-type-form';
import { UserTypeService } from '../../services/user-type';

describe('UserTypeFormComponent', () => {
  let component: UserTypeFormComponent;
  let fixture: ComponentFixture<UserTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeFormComponent],
      providers: [
        {
          provide: UserTypeService,
          useValue: {
            getUserTypeById: () => of({}),
            createUserType: () => of({}),
            updateUserType: () => of({}),
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

    fixture = TestBed.createComponent(UserTypeFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
