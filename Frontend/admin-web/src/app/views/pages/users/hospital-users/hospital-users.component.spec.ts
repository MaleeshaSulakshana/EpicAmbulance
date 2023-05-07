import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUsersComponent } from './hospital-users.component';

describe('HospitalUsersComponent', () => {
  let component: HospitalUsersComponent;
  let fixture: ComponentFixture<HospitalUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
