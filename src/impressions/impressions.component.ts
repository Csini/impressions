import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'impressions-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './impressions.component.html',
  styleUrl: './impressions.component.scss'
})
export class ImpressionsComponent {
  title = 'impressions';
}
