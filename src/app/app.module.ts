import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
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
import { DraftComponentComponent } from './draft-component/draft-component.component';
import { HeroGridComponent } from './hero-grid/hero-grid.component';



@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HomeComponentComponent,
    SettingsComponent,
    ColorScaleDirective,
    HeroesComponent,
    DraftComponentComponent,
    HeroGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [HeroService, ChartService, ColorScaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
