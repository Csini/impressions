import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [
    { path: '', redirectTo: 'board', pathMatch: 'full' }, //default route
    { path: 'board', component: BoardComponent },
  ];
