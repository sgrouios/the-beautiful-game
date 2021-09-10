import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerStatsComponent } from './player-stats.component';

const routes: Routes = [{ path: '', component: PlayerStatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerStatsRoutingModule { }
