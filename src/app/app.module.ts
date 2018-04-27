import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroImageComponent } from './hero-image/hero-image.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { SettingsComponent } from './settings/settings.component';
import { ColorScaleDirective } from './color-scale.directive';
import { ChartService } from './chart.service';
import { ColorScaleService } from './color-scale.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroImageComponent,
    HomeComponentComponent,
    SettingsComponent,
    ColorScaleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HeroService, ChartService, ColorScaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
