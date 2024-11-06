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

  notes: Map<String, Note> = new Map<String, Note>();

  constructor(private localService: LocalService) {

    // TODO
    /*
    if(this.notes.size==0){

      
      this.addNote(new Note());
      this.addNote(new Note("Third"));
      this.addNote(new Note("Full", 120, 450));
      
      
      console.log("hmmmm: " + this.notes)
      this.localService.saveData(Array.from(this.notes.values()));
      
     
    }
      */
  }

  addNote(note: Note) {
    this.notes.set(note.id, note);
  }

  ngOnInit(): void {

    this.loadNotes();

    //this.notes.push(new Note(200, 230));

    //this.notes.push(new Note());
    //this.notes.push(new Note("Third"));
    //this.notes.push(new Note("Full", 120, 450));
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
    this.notes.set(item.id, item);
    //console.log(this.notes);
    this.localService.saveData(Array.from(this.notes.values()));
  }

  getNoteValues(): Array<Note> {
    //return Array.from(this.shared_position.values());
    //return this.notes;
    console.log("getNoteValues(): " + this.notes.size);
    return Array.from(this.notes.values());
  }

  private loadNotes() {
    this.notes = new Map(this.localService.getData().map(obj => [obj.id, obj]));
  }

  submitAdd($event: any) {
    this.loadNotes();
  }
}
