import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Input as RouterInput } from '@angular/core';
import { LocalService } from '../common/local.service';
import { Note } from '../note/note.model';
import { JsonPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'impressions-note-detail',
  standalone: true,
  imports: [RouterLink, NgFor, ReactiveFormsModule, JsonPipe],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss'
})
export class NoteDetailComponent implements OnInit {

  @RouterInput() id!: string;

  note: Note = new Note();

  noteDetailForm!: FormGroup;

  @ViewChild('newRowInput')
  newRowInput!: ElementRef;

  constructor(private localService: LocalService, private changeDetector: ChangeDetectorRef, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log('NoteDetailComponent: ' + this.id);

    this.noteDetailForm = new FormGroup({
      newRow: new FormControl(''),
      rows: this.fb.array([]),
    });

    this.reloadNote();
  }

  get rows(): FormArray {
    return this.noteDetailForm.get("rows") as FormArray
  }

  rowValue (index: number): string {
    return this.rows.at(index).value.row;
  }

  get newRow(): FormControl {
    return this.noteDetailForm.get('newRow') as FormControl;
  }

  onFocusOutRowEvent($event: FocusEvent, index: number) {
    console.log("onFocusOutRowEvent[" + JSON.stringify($event) + ", " + index + "]");

    let newValue : string = this.rowValue(index);
    console.log("newValue:" + newValue);

    this.note.rows[index] = newValue;

    this.localService.changeData(this.note);
    this.reloadNote();
  }

  onFocusOutNewRowEvent($event: FocusEvent) {
    console.log("onFocusOutNewRowEvent[" + this.newRow?.value + "]")
    if (this.newRow?.value && this.newRow?.value != '') {
      this.note.rows.push(this.newRow?.value);
      this.localService.changeData(this.note);
      this.reloadNote();
      this.newRow?.setValue('');
    }
  }

  reloadNote() {
    this.note = this.localService.findData(this.id);
    let counter: number = 0;

    this.rows.clear();

    this.note.rows.forEach(rowItem => {
      let group: FormGroup = new FormGroup({
        row: new FormControl(rowItem)
      });
      this.rows.push(group);
    }
    );

    this.changeDetector.detectChanges();
    this.newRowInput.nativeElement.focus();
  }

  submitForm() {
    throw new Error('Method not implemented.');
  }

}
