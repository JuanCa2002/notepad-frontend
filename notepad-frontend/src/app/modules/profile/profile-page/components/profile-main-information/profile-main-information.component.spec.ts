import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainInformationComponent } from './profile-main-information.component';

describe('ProfileMainInformationComponent', () => {
  let component: ProfileMainInformationComponent;
  let fixture: ComponentFixture<ProfileMainInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMainInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileMainInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
