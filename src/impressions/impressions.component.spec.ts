import { TestBed } from '@angular/core/testing';
import { ImpressionsComponent } from './impressions.component';

describe('ImpressionsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpressionsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ImpressionsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'impressions' title`, () => {
    const fixture = TestBed.createComponent(ImpressionsComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('impressions');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ImpressionsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, impressions');
  });
});
