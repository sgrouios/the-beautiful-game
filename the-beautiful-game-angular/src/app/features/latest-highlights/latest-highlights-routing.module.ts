import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestHighlightsComponent } from './latest-highlights.component';

const routes: Routes = [{ path: '', component: LatestHighlightsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatestHighlightsRoutingModule { }
