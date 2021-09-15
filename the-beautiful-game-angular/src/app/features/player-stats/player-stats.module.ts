import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerStatsRoutingModule } from './player-stats-routing.module';
import { PlayerStatsComponent } from './player-stats.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { PlayerProfileComponent } from '../player-profile/player-profile.component';


@NgModule({
  declarations: [
    PlayerStatsComponent,
    PlayerSearchComponent,
    PlayerProfileComponent
  ],
  imports: [
    CommonModule,
    PlayerStatsRoutingModule,
    SharedModule
  ]
})
export class PlayerStatsModule { }
