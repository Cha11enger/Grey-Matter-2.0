//  tells Angular how to assemble the application
/// As you add more components to the app, they must be declared here.


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { ClassicboxComponent } from "./pages/boxes/classicbox/classicbox.component";
import { ClassicgamepageComponent } from "./pages/gamepages/classicgamepage/classicgamepage.component";

import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "classicbox", component: ClassicboxComponent },
  { path: "classicgamepage", component: ClassicgamepageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }), 
    HttpClientModule
  ],
  exports: []
})
export class AppRoutingModule {}
