import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { LocalService } from '../common/local.service';
import { Note } from '../note/note.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'impressions-overview',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  notes: Note[] = [];

  constructor(private logger: NGXLogger, private localService: LocalService) {

  }

  ngOnInit(): void {
    this.loadNotes();
  }

  private loadNotes() {
    this.notes = this.localService.getData();
  }
}
