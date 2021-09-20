import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PlayerProfile } from 'src/app/models/player-profile';
import { LoadingService } from 'src/app/services/loading.service';
import { PlayerService } from 'src/app/services/player.service';

import { PlayerProfileComponent } from './player-profile.component';

describe('PlayerProfileComponent', () => {
  let component: PlayerProfileComponent;
  let fixture: ComponentFixture<PlayerProfileComponent>;
  let mockPlayerService: jasmine.SpyObj<PlayerService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  const playerProfile: PlayerProfile = 
  {
    playerDetails: {
      id: 1,
      firstName: 'first',
      surname: 'surname',
      imageUrl: 'url',
      position: 'Midfielder'
    },
    gamesPlayed: 1,
    totalMinutes: 1,
    goals: 1,
    assists: 1,
    cleanSheets: 1,
    goalsConceded: 1,
    ownGoals: 1,
    penaltiesMissed: 1,
    penaltiesSaved: 1,
    yellowCards: 1,
    redCards: 1,
    saves: 1
  };

  beforeEach(async () => {
    mockPlayerService = jasmine.createSpyObj<PlayerService>(['playerProfile']);
    mockLoadingService = jasmine.createSpyObj<LoadingService>(['setLoading']);
    await TestBed.configureTestingModule({
      declarations: [ PlayerProfileComponent ],
      providers: [
        { provide: PlayerService, useValue: mockPlayerService },
        { provide: LoadingService, useValue: mockLoadingService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    void expect(component).toBeTruthy();
  });

  it('getPlayerProfile should emit to player profile subject', () => {
    mockPlayerService.playerProfile.and.returnValue(of(playerProfile));
    mockLoadingService.setLoading.and.returnValue();
    const playerProfileSubjectSpy = spyOn(component.playerProfile$, 'next');
    component.getPlayerProfile(playerProfile.playerDetails);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledWith(true);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledWith(false);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledTimes(2);
    void expect(mockPlayerService.playerProfile).toHaveBeenCalledTimes(1);
    void expect(playerProfileSubjectSpy).toHaveBeenCalledOnceWith(playerProfile);
  });

  it('getPlayerProfile should log error', () => {
    mockPlayerService.playerProfile.and.returnValue(throwError(new Error()));
    mockLoadingService.setLoading.and.returnValue();
    const playerProfileSubjectSpy = spyOn(component.playerProfile$, 'next');
    component.getPlayerProfile(playerProfile.playerDetails);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledWith(true);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledWith(false);
    void expect(mockLoadingService.setLoading).toHaveBeenCalledTimes(2);
    void expect(mockPlayerService.playerProfile).toHaveBeenCalledTimes(1);
    void expect(playerProfileSubjectSpy).not.toHaveBeenCalled();
  });

});
