import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { SettingsComponent } from './settings/settings.component';
import { HeroesComponent } from './heroes/heroes.component';


const routes: Routes = [
  { path: 'settings' , component: SettingsComponent},
  { path: 'hero/:internalname', component: HeroDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponentComponent },
  { path: 'heroes', component: HeroesComponent },
];



@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})


/*@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
 */
export class AppRoutingModule {}
