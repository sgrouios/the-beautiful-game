import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NoSanitizePipe } from '../pipes/no-sanitize.pipe';


@NgModule({
  declarations: [
    NoSanitizePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    NoSanitizePipe
  ]
})
export class SharedModule { }
