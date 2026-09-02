import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { UserTypeListComponent } from './user-type-list';
import { UserTypeService } from '../../services/user-type';

describe('UserTypeListComponent', () => {
  let component: UserTypeListComponent;
  let fixture: ComponentFixture<UserTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeListComponent],
      providers: [provideRouter([]),
        {
          provide: UserTypeService,
          useValue: {
            getUserTypes: () => of([]),
            deleteUserType: () => of(void 0),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTypeListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
