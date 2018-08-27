import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';

// services
import { HeroService } from './hero.service';
import { ChartService } from './chart.service';
import { ColorScaleService } from './color-scale.service';

// directives
import { ColorScaleDirective } from './color-scale.directive';

// components
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { SettingsComponent } from './settings/settings.component';

// modules
import { AppRoutingModule } from './app-routing.module';
import { HeroesComponent } from './heroes/heroes.component';



@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HomeComponentComponent,
    SettingsComponent,
    ColorScaleDirective,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule,
    MatCardModule,
    MatTooltipModule
  ],
  providers: [HeroService, ChartService, ColorScaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
