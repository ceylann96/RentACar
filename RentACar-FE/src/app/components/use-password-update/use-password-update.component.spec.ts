import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePasswordUpdateComponent } from './use-password-update.component';

describe('UsePasswordUpdateComponent', () => {
  let component: UsePasswordUpdateComponent;
  let fixture: ComponentFixture<UsePasswordUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsePasswordUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsePasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
