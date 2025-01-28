import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDialogCreateComponent } from './notes-dialog-create.component';

describe('NotesDialogCreateComponent', () => {
  let component: NotesDialogCreateComponent;
  let fixture: ComponentFixture<NotesDialogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesDialogCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesDialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
