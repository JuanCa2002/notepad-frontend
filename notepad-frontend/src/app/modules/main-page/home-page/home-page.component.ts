import { Component, ViewChild } from '@angular/core';
import { NotesManagementComponent } from './components/notes-management/notes-management.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  @ViewChild('notes') notes!: NotesManagementComponent;

  public resetNotes(){
    this.notes.resetData();
  }

}
