import { bootstrapApplication } from '@angular/platform-browser';
import { ImpressionsComponent } from './impressions/impressions.component';
import { config } from './impressions/impressions.config.server';

const bootstrap = () => bootstrapApplication(ImpressionsComponent, config);

export default bootstrap;
