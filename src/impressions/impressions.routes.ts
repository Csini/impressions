import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { AddComponent } from './add/add.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' }, //default route
  { path: 'board', component: BoardComponent },
  /* { path: 'board/add', component: AddComponent }, */
  { path: 'note/:id', component: NoteDetailComponent },
];
