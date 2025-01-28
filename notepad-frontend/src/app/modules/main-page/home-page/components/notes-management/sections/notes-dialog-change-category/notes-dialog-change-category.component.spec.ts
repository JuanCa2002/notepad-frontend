import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDialogChangeCategoryComponent } from './notes-dialog-change-category.component';

describe('NotesDialogChangeCategoryComponent', () => {
  let component: NotesDialogChangeCategoryComponent;
  let fixture: ComponentFixture<NotesDialogChangeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesDialogChangeCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesDialogChangeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
