import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDataViewComponent } from './notes-data-view.component';

describe('NotesDataViewComponent', () => {
  let component: NotesDataViewComponent;
  let fixture: ComponentFixture<NotesDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesDataViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
