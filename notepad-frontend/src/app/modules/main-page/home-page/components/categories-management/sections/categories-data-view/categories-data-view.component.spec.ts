import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDataViewComponent } from './categories-data-view.component';

describe('CategoriesDataViewComponent', () => {
  let component: CategoriesDataViewComponent;
  let fixture: ComponentFixture<CategoriesDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesDataViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
