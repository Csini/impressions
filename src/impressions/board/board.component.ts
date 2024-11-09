import { Component, OnInit } from '@angular/core';
import { NoteComponent } from "../note/note.component";
import { DndDropEvent, DndModule } from 'ngx-drag-drop';
import { Note } from '../note/note.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocalService } from '../common/local.service';
import { AddComponent } from "../add/add.component";

@Component({
  selector: 'impressions-board',
  standalone: true,
  imports: [NoteComponent, DndModule, NgFor, AddComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  notes: Note[] = [];

  constructor(private localService: LocalService) {

  }

  ngOnInit(): void {

    this.loadNotes();

    //this.notes.push(new Note(200, 230));

    //this.notes.push(new Note());
    //this.notes.push(new Note("Third"));
    //this.notes.push(new Note("Full", 120, 450));
    //this.localService.saveData(Array.from(this.notesIntern.values()));
    //this.loadNotes();
  }

  onDragover(event: DragEvent) {

    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent) {

    console.log("dropped", JSON.stringify(event, null, 2));

    /*
    //console.log(this.notes);
    console.log(this.notes instanceof Map);

    this.notes.set(event.data.id, event.data);
    //console.log(this.notes);
    this.localService.saveData(Array.from(this.notes.values()));
    */
  }

  dragItem(item: Note) {
    console.log("dragItem: " + JSON.stringify(item));
    this.localService.changeData(item);
    this.loadNotes();
  }

  private loadNotes() {
    this.notes = this.localService.getData();
  }

  submitAdd($event: any) {
    this.loadNotes();
  }
}
