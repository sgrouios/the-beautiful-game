import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'latest-highlights', loadChildren: () => import('./features/latest-highlights/latest-highlights.module').then(m => m.LatestHighlightsModule) },
  { path: 'player-stats', loadChildren: () => import('./features/player-stats/player-stats.module').then(m => m.PlayerStatsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
