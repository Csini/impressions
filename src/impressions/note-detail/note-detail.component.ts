import { Component, Input, OnInit } from '@angular/core';
import { Input as RouterInput } from '@angular/core';
import { LocalService } from '../common/local.service';
import { Note } from '../note/note.model';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'impressions-note-detail',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss'
})
export class NoteDetailComponent implements OnInit {

  @RouterInput() id!: string;

  note: Note = new Note();

  constructor(private localService: LocalService) {

  }

  ngOnInit(): void {
    console.log('NoteDetailComponent: ' + this.id);
    this.note =this.localService.findData(this.id);
  }


  content = ""
  addBulletText(event: KeyboardEvent) {
 
    if (event.code === "Enter") {
      this.content += '• '
    }

    this.content = this.content.replace(/[\r|\n|\r\n]$/, '');
  }

  mytextOnFocus() {
    if(this.content.length==0){
      this.content += '• ';
    }

  }
}
