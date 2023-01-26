import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningPageComponent } from './winning-page.component';

describe('WinningPageComponent', () => {
  let component: WinningPageComponent;
  let fixture: ComponentFixture<WinningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinningPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
