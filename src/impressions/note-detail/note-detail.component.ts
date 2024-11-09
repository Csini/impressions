import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Input as RouterInput } from '@angular/core';
import { LocalService } from '../common/local.service';
import { Note } from '../note/note.model';
import { JsonPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DndDropEvent, DndModule, EffectAllowed } from 'ngx-drag-drop';

@Component({
  selector: 'impressions-note-detail',
  standalone: true,
  imports: [RouterLink, NgFor, ReactiveFormsModule, JsonPipe, DndModule],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss'
})
export class NoteDetailComponent implements OnInit {

  @RouterInput() id!: string;

  note: Note = new Note();

  noteDetailForm!: FormGroup;

  @ViewChild('newRowInput')
  newRowInput!: ElementRef;

  effectAllowed: EffectAllowed = 'all';

  disable = false;
  handle = false;

  constructor(private localService: LocalService, private changeDetector: ChangeDetectorRef, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log('NoteDetailComponent: ' + this.id);

    this.noteDetailForm = new FormGroup({
      label: new FormControl(this.id),
      newRow: new FormControl(''),
      rows: this.fb.array([]),
    });

    this.reloadNote();

    this.changeDetector.detectChanges();
    this.newRowInput.nativeElement.focus();
  }

  get rows(): FormArray {
    return this.noteDetailForm.get("rows") as FormArray
  }

  rowValue(index: number): string {
    return this.rows.at(index).value.row;
  }

  get newRow(): FormControl {
    return this.noteDetailForm.get('newRow') as FormControl;
  }

  get label(): FormControl {
    return this.noteDetailForm.get('label') as FormControl;
  }

  onFocusOutRowEvent($event: Event, index: number) {
    console.log("onFocusOutRowEvent[" + JSON.stringify($event) + ", " + index + "]");

    let newValue: string = this.rowValue(index);
    console.log("newValue:" + newValue);

    this.note.rows[index] = newValue;

    this.note.rows = this.note.rows.filter(function (e) { return e });

    this.localService.changeData(this.note);
    this.reloadNote();
  }

  onFocusOutNewRowEvent($event: Event) {
    console.log("onFocusOutNewRowEvent[" + this.newRow?.value + "]")
    if (this.newRow?.value && this.newRow?.value != '') {
      this.note.rows.push(this.newRow?.value);
      this.localService.changeData(this.note);
      this.reloadNote();
      this.newRow?.setValue('');

      this.changeDetector.detectChanges();
      this.newRowInput.nativeElement.focus();
    }
  }

  onFocusOutLabelEvent($event: Event) {
    console.log("onFocusOutLabelEvent[" + $event + "]")
    this.note.label = this.label.value;

    this.localService.changeData(this.note);
    this.reloadNote()
  }

  deleteRow(index: number) {

    console.log("deleteRow[" + index + "]")
    this.note.rows[index] = '';

    this.note.rows = this.note.rows.filter(function (e) { return e });

    this.localService.changeData(this.note);
    this.reloadNote();
  }

  reloadNote() {
    this.note = this.localService.findData(this.id);

    this.label.setValue(this.note.label);

    this.rows.clear();

    this.note.rows.forEach(rowItem => {
      let group: FormGroup = new FormGroup({
        row: new FormControl(rowItem)
      });
      this.rows.push(group);
    }
    );
  }

  onDragover(event: DragEvent, index: number) {
    console.log("dragover", JSON.stringify(event, null, 2), index);
  }

  onDrop(event: DndDropEvent, index: number) {

    console.log("dropped", JSON.stringify(event, null, 2), index);

    let temp: string = this.note.rows[event.data];

    this.note.rows[event.data] = '';

    this.note.rows.splice(index, 0, temp);
    this.note.rows = this.note.rows.filter(function (e) { return e });

    this.localService.changeData(this.note);
    this.reloadNote();

  }

  onDragStart(event: DragEvent) {

    console.log("drag started: " + this.note.id, JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    console.log("drag ended: " + this.note.id, JSON.stringify(event, null, 2));
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


  submitForm() {
    //do nothing

    console.log("submitForm");
  }

}
