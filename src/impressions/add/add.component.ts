import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LocalService } from '../common/local.service';
import { Note } from '../note/note.model';
import { NGXLogger } from 'ngx-logger';

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
  submitAddEvent = new EventEmitter<string>();

  @ViewChild('notelabelInput')
  notelabelInput!: ElementRef;

  constructor(private logger: NGXLogger, private localService: LocalService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      notelabel: new FormControl(''),
    });
  }

  get notelabel() {
    return this.addForm.get('notelabel');
  }

  beginAdd() {
    this.logger.debug('beginAdd');
    this.inProgress = true;
    this.changeDetector.detectChanges();
    this.notelabelInput.nativeElement.focus();
  }

  submitForm() {
    this.logger.debug('submitForm');
  }

  onFocusOutEvent($event: Event) {
    this.logger.info("onFocusOutEvent[" + this.notelabel?.value + "]")
    if (!this.notelabel?.value || this.notelabel?.value === '') {
      this.inProgress = false;
    } else {
      let note: Note = new Note(this.notelabel?.value);
      this.localService.addData(note);
      this.inProgress = false;
      this.submitAddEvent.emit(note.id);
      this.notelabel?.setValue('');
      this.addForm.reset();
    }
  }
}
