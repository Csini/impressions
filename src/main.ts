import { bootstrapApplication } from '@angular/platform-browser';
import { impressionsConfig } from './impressions/impressions.config';
import { ImpressionsComponent } from './impressions/impressions.component';

bootstrapApplication(ImpressionsComponent, impressionsConfig)
  .catch((err) => console.error(err));
