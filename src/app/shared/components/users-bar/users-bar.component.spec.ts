import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBarComponent } from './users-bar.component';

describe('UsersBarComponent', () => {
  let component: UsersBarComponent;
  let fixture: ComponentFixture<UsersBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
