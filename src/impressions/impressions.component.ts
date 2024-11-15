import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from "./board/board.component";

@Component({
  selector: 'impressions-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent],
  templateUrl: './impressions.component.html',
  styleUrl: './impressions.component.scss'
})
export class ImpressionsComponent {
  title = 'impressions';
}
