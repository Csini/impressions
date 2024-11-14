import { Component, OnInit } from '@angular/core';
import { NoteComponent } from "../note/note.component";
import { DndDropEvent, DndModule } from 'ngx-drag-drop';
import { Note } from '../note/note.model';
import { NgFor } from '@angular/common';
import { LocalService } from '../common/local.service';
import { AddComponent } from "../add/add.component";
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'impressions-board',
  standalone: true,
  imports: [NoteComponent, DndModule, NgFor, AddComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  notes: Note[] = [];

  private cancel: boolean = false;

  constructor(private logger: NGXLogger, private localService: LocalService) {

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

    this.logger.trace("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent) {

    this.logger.trace("dropped", JSON.stringify(event, null, 2));
  }

  dragItem(item: Note) {
    if (this.cancel) {
      this.logger.info("CANCELLED dragItem: " + item.id);
      this.cancel = false;
      this.loadNotes();
      return;
    }
    this.logger.info("dragItem: " + item.id);
    this.localService.changeData(item);
    this.loadNotes();
  }

  private loadNotes() {
    this.notes = this.localService.getData();
  }

  submitAdd($event: any) {
    this.loadNotes();
  }

  onDragoverRecycleBin(event: DragEvent) {

    this.logger.trace("dragoverRecycleBin", JSON.stringify(event, null, 2));
  }

  onDropRecycleBin(event: DndDropEvent) {

    this.logger.info("droppedRecycleBin", JSON.stringify(event, null, 2));

    let note: Note = this.localService.findData(event.data);


    if (confirm("Are you sure you want to delete Impression(" + note.label + ") ?")) {
      this.logger.warn("deleting...");

      this.localService.removeData(note);

      this.loadNotes();
    } else {
      this.cancel = true;
      /*note.posX = 100;
      note.posY = 100;
      this.localService.changeData(note);*/
    }
  }

  clearAll() {
    this.logger.info("clearAll");
    if (confirm("Are you sure you want to delete ALL Impressions ?")) {
      this.logger.warn("deleting ALL...");
    
      this.localService.removeAllData();

      this.loadNotes();
    }
  }
}