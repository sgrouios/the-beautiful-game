import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestHighlightsRoutingModule } from './latest-highlights-routing.module';
import { LatestHighlightsComponent } from './latest-highlights.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LatestHighlightsComponent
  ],
  imports: [
    CommonModule,
    LatestHighlightsRoutingModule,
    SharedModule
  ]
})
export class LatestHighlightsModule { }
