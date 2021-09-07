import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestHighlightsComponent } from './latest-highlights.component';

describe('LatestHighlightsComponent', () => {
  let component: LatestHighlightsComponent;
  let fixture: ComponentFixture<LatestHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestHighlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
