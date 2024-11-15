import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DndModule, EffectAllowed } from 'ngx-drag-drop';
import { Note } from './note.model';
import { RouterLink } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'impressions-note',
  standalone: true,
  imports: [DndModule, RouterLink],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit {

  @Input({ required: true })
  note: Note = new Note();

  @Input({ required: true })
  nowAddedIsOn: boolean = false;

  @Output()
  dragItemEvent = new EventEmitter<Note>();

  // note that data is handled with JSON.stringify/JSON.parse
  // only set simple data or POJO's as methods will be lost
  // draggable.data = id

  effectAllowed: EffectAllowed = 'all';

  disable = false;
  handle = false;

  constructor(private logger: NGXLogger) {
  }

  ngOnInit(): void {


  }

  onDragStart(event: DragEvent) {

    this.logger.trace("drag started: " + this.note.id, JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {

    this.logger.debug("drag ended: " + this.note.id, JSON.stringify(event, null, 2));
    this.note.posX = (event.pageX - 50);
    this.note.posY = (event.pageY - 50);
    this.logger.info(this.note.id + " dragged to " + event.pageX + ', ' + event.pageY);
    this.dragItemEvent.emit(this.note);
  }

  onDraggableCopied(event: DragEvent) {

    this.logger.trace("draggable copied: " + this.note.id, JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {

    this.logger.trace("draggable linked: " + this.note.id, JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event: DragEvent) {

    this.logger.trace("draggable moved: " + this.note.id, JSON.stringify(event, null, 2));
  }

  onDragCanceled(event: DragEvent) {

    this.logger.trace("drag cancelled: " + this.note.id, JSON.stringify(event, null, 2));
  }

  openNote() {
    throw new Error('Method not implemented.');
  }
}
