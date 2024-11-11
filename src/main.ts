import { bootstrapApplication } from '@angular/platform-browser';
import { impressionsConfig } from './impressions/impressions.config';
import { ImpressionsComponent } from './impressions/impressions.component';
import { polyfill } from 'mobile-drag-drop';
// optional import of scroll behaviour
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";

bootstrapApplication(ImpressionsComponent, impressionsConfig)
  .catch((err) => console.error(err));


polyfill({
  // use this to make use of the scroll behaviour
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});

// workaround to make scroll prevent work in iOS Safari >= 10
try {
  window.addEventListener("touchmove", function () { }, { passive: false });
}
catch (e) { }