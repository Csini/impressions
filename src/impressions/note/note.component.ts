import { Component, Input } from '@angular/core';
import { randomUUID } from 'crypto';

import { DndDropEvent, DndModule, EffectAllowed } from 'ngx-drag-drop';
import { Note } from './note.model';

@Component({
  selector: 'impressions-note',
  standalone: true,
  imports: [DndModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  @Input({required:true})
  note: Note = new Note();

  x : string = this.note.getX();
  y : string = this.note.getY();

  onDragStart(event: DragEvent) {

    console.log("drag started: " + this.note.id, JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {

    console.log("drag ended: " + this.note.id, JSON.stringify(event, null, 2));
    this.x = (event.pageX-50) + 'px';;
    this.y = (event.pageY-50) + 'px';;
    console.log(event.pageX + ', ' + event.pageY);
  }

  onDraggableCopied(event: DragEvent) {

    console.log("draggable copied: " + this.note.id, JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {

    console.log("draggable linked: " + this.note.id, JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event: DragEvent) {

    console.log("draggable moved: " + this.note.id, JSON.stringify(event, null, 2));
  }

  onDragCanceled(event: DragEvent) {

    console.log("drag cancelled: " + this.note.id, JSON.stringify(event, null, 2));
  }

}
