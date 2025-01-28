import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDialogCreateComponent } from './categories-dialog-create.component';

describe('CategoriesDialogCreateComponent', () => {
  let component: CategoriesDialogCreateComponent;
  let fixture: ComponentFixture<CategoriesDialogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesDialogCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesDialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
