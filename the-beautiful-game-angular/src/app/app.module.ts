import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './features/home/home.component';
import { LoadingComponent } from './features/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoadingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
