import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosingPageComponent } from './losing-page.component';

describe('LosingPageComponent', () => {
  let component: LosingPageComponent;
  let fixture: ComponentFixture<LosingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LosingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LosingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
