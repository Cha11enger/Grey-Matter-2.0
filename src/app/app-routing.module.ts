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
import { PyramidboxComponent } from "./pages/boxes/pyramidbox/pyramidbox.component";
import { ClassicgamepageComponent } from "./pages/gamepages/classicgamepage/classicgamepage.component";
import { ClassicgamepageComponent1 } from "./pages/gamepages/classicgamepage1/classicgamepage1.component";
import { ClassicgamepageComponent2 } from "./pages/gamepages/classicgamepage2/classicgamepage2.component";
import { ClassicgamepageComponent3 } from "./pages/gamepages/classicgamepage3/classicgamepage3.component";

import { CursedgamepageComponent1 } from "./pages/gamepages/cursedgamepage1/cursedgamepage1.component";
import { CursedgamepageComponent2 } from "./pages/gamepages/cursedgamepage2/cursedgamepage2.component";
import { CursedgamepageComponent3 } from "./pages/gamepages/cursedgamepage3/cursedgamepage3.component";

import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "classicbox", component: ClassicboxComponent },  
  { path: "cursedbox", component: PyramidboxComponent },
  { path: "classicgamepage", component: ClassicgamepageComponent },
  { path: "classicgamepage1", component: ClassicgamepageComponent1 },
  { path: "classicgamepage2", component: ClassicgamepageComponent2 },
  { path: "classicgamepage3", component: ClassicgamepageComponent3 },
  { path: "cursedgamepage1", component: CursedgamepageComponent1 },
  { path: "cursedgamepage2", component: CursedgamepageComponent2 },
  { path: "cursedgamepage3", component: CursedgamepageComponent3 }
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
