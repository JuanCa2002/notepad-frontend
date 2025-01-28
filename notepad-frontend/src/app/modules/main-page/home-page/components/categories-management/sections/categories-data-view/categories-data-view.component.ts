import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryDTO } from '../../../../../../../dtos/categories/category-dto';
import { CategoryApiService } from '../../services/category-api.service';
import { MessageService } from 'primeng/api';
import { LoginApiService } from '../../../../../../login/login-page/services/login-api.service';

@Component({
  selector: 'app-categories-data-view',
  templateUrl: './categories-data-view.component.html',
  styleUrl: './categories-data-view.component.css'
})
export class CategoriesDataViewComponent implements OnInit{

  public categories: CategoryDTO[] = [];
  @Output() onEdit = new EventEmitter<CategoryDTO>();

  constructor(private categoryApiService: CategoryApiService, private messageService: MessageService,
    private loginApiService: LoginApiService
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(){
    const user = this.loginApiService.getUser();
    this.categoryApiService.getCategoriesByUser$(user!.id!).subscribe(data =>{
      this.categories = data;
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message});
    })
  }

  public editCategory(category: CategoryDTO){
    this.onEdit.emit(category);
  }

}
