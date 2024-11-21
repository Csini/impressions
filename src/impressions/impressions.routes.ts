import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { AddComponent } from './add/add.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { OverviewComponent } from './overview/overview.component';


export const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' }, //default route
  { path: 'board', component: BoardComponent },
  { path: 'overview', component: OverviewComponent },
  /* { path: 'board/add', component: AddComponent }, */
  { path: 'note/:id', component: NoteDetailComponent },
];
