import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerStatsRoutingModule } from './player-stats-routing.module';
import { PlayerStatsComponent } from './player-stats.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PlayerStatsComponent
  ],
  imports: [
    CommonModule,
    PlayerStatsRoutingModule,
    SharedModule
  ]
})
export class PlayerStatsModule { }
