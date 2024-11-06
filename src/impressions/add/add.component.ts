import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(private localService: LocalService) {
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      noteid: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  get noteid() {
    return this.addForm.get('noteid');
  }

  beginAdd() {
    console.log('beginAdd');
    this.inProgress = true;
  }

  submitForm() {
    if(!this.addForm.valid){
      this.noteid?.markAsTouched();
      return;
    }
    console.log('submitForm');
    let note : Note = new Note(this.noteid?.value);
    this.localService.addData(note);
    this.inProgress = false;
    this.submitAddEvent.emit();
  }
}
