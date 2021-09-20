import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Highlight } from 'src/app/models/highlight';
import { HighlightsService } from 'src/app/services/highlights.service';
import { LoadingService } from 'src/app/services/loading.service';

import { LatestHighlightsComponent } from './latest-highlights.component';

describe('LatestHighlightsComponent', () => {
  let component: LatestHighlightsComponent;
  let fixture: ComponentFixture<LatestHighlightsComponent>;
  let mockHighlightsService: jasmine.SpyObj<HighlightsService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  let highlights: Highlight[] = [ 
    {
      title: 'title',
      competition: 'competition',
      matchViewUrl: 'url',
      thumbnail: 'thumbnail',
      date: new Date(),
      videos: [
        { title: 'title', embed: 'embed'}
      ]
    },
    {
      title: 'title 2',
      competition: 'competition 2',
      matchViewUrl: 'url 2',
      thumbnail: 'thumbnail 2',
      date: new Date(),
      videos: [
        { title: 'title', embed: 'embed'}
      ]
    }];

  beforeEach(async () => {
    mockHighlightsService = jasmine.createSpyObj<HighlightsService>(['getLatestHighlights']);
    mockLoadingService = jasmine.createSpyObj<LoadingService>(['setLoading']);
    await TestBed.configureTestingModule({
      declarations: [ LatestHighlightsComponent ],
      providers: [
        { provide: HighlightsService, useValue: mockHighlightsService },
        { provide: LoadingService, useValue: mockLoadingService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockHighlightsService.getLatestHighlights.and.returnValue(of(highlights));
    fixture = TestBed.createComponent(LatestHighlightsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    void expect(component).toBeTruthy();
  });

  it('AfterViewInit should call getLatestHighlights', () => {
    const getLatestSpy = spyOn(component, 'getLatestHighlights');
    component.ngAfterViewInit();
    void expect(getLatestSpy).toHaveBeenCalledTimes(1);
  });

  it('getLatestHighlights should emit latestHighlights on success', () => {
    mockLoadingService.setLoading.and.returnValue();
    const datesSubjectSpy = spyOn(component.dates$, 'next');
    const getHighlightDatesSpy = spyOn(component, 'getHighlightDates');
    const latestHighlightsSelectedSpy = spyOn(component.latestHighlightsSelected$, 'next');
    component.getLatestHighlights();
    void expect(mockLoadingService.setLoading).toHaveBeenCalledWith(true);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledTimes(2);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledWith(false);
    void expect(datesSubjectSpy).toHaveBeenCalledTimes(1);
    void expect(getHighlightDatesSpy).toHaveBeenCalledOnceWith(highlights);
    void expect(latestHighlightsSelectedSpy).toHaveBeenCalledOnceWith(highlights);
    void expect(component.allHighlights).toEqual(highlights);
  });

  it('getLatestHighlights should log error', () => {
    mockHighlightsService.getLatestHighlights.and.returnValue(throwError(new Error()));
    mockLoadingService.setLoading.and.returnValue();
    const latestHighlightsSelectedSpy = spyOn(component.latestHighlightsSelected$, 'next');
    component.getLatestHighlights();
    void expect(mockLoadingService.setLoading).toHaveBeenCalledWith(true);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledTimes(2);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledWith(false);
    void expect(latestHighlightsSelectedSpy).not.toHaveBeenCalled();
  });

  it('selectAllHighlights should emit new highlights', () => {
    const latestHighlightsSelectedSpy = spyOn(component.latestHighlightsSelected$, 'next');
    component.latestHighlightsSelected$.next([highlights[0]]);
    component.selectAllHighlights();
    void expect(latestHighlightsSelectedSpy).toHaveBeenCalled();
    void expect(component.allSelected).toBeTrue();
  });

  it('selectAllHighlights should not emit new highlights', () => {
    component.allHighlights = highlights;
    component.latestHighlightsSelected$.next(component.allHighlights);
    const latestHighlightsSelectedSpy = spyOn(component.latestHighlightsSelected$, 'next');
    component.selectAllHighlights();
    void expect(latestHighlightsSelectedSpy).not.toHaveBeenCalled();
    void expect(component.allSelected).toBeTrue();
  });
});
