import { Component } from '@angular/core';
import { NoteComponent } from "../note/note.component";

@Component({
  selector: 'impressions-board',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

}
