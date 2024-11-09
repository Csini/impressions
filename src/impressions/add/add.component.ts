import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LocalService } from '../common/local.service';
import { Note } from '../note/note.model';

@Component({
  selector: 'impressions-add',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {

  inProgress: boolean = false;

  addForm!: FormGroup;

  @Output()
  submitAddEvent = new EventEmitter();

  @ViewChild('notelabelInput')
  notelabelInput!: ElementRef;

  constructor(private localService: LocalService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      notelabel: new FormControl('', [
        Validators.minLength(1),
      ]),
    });
  }

  get notelabel() {
    return this.addForm.get('notelabel');
  }

  beginAdd() {
    console.log('beginAdd');
    this.inProgress = true;
    this.changeDetector.detectChanges();
    this.notelabelInput.nativeElement.focus();
  }

  submitForm() {
    if (!this.addForm.valid) {
      this.notelabel?.markAsTouched();
      return;
    }
    console.log('submitForm');
    let note: Note = new Note(this.notelabel?.value);
    this.localService.addData(note);
    this.inProgress = false;
    this.submitAddEvent.emit();
    this.notelabel?.setValue('');
    this.addForm.reset();
  }

  onFocusOutEvent($event: FocusEvent) {
    console.log("onFocusOutEvent[" + this.notelabel?.value + "]")
    if (!this.notelabel?.value || this.notelabel?.value === '') {
      this.inProgress = false;
    }
  }
}
