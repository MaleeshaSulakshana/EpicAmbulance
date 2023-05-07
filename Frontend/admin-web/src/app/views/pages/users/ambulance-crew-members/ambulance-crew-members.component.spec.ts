import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceCrewMembersComponent } from './ambulance-crew-members.component';

describe('AmbulanceCrewMembersComponent', () => {
  let component: AmbulanceCrewMembersComponent;
  let fixture: ComponentFixture<AmbulanceCrewMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmbulanceCrewMembersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulanceCrewMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
