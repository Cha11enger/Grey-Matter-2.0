import { Component, OnInit, OnDestroy, Input} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import Chart from "chart.js";
import * as $ from "jquery";
import * as jQuery from 'jquery';
import { mixinColor } from '@angular/material/core';

@Component({
  selector: "app-classicgamepage1",
  templateUrl: "classicgamepage1.component.html",
  styleUrls: ['classicgamepage1.component.css']
})
export class ClassicgamepageComponent1 implements OnInit, OnDestroy {
  isCollapsed = true;
  wid1;
  hei1;
 
  showdoty = false;
  showdotr = false;
  showdotg = false;
  showdotb = false;

  constructor(private http: HttpClient) {
  
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");

   // $(document).ready(function(e) {
   //   $('img[usemap]').rwdImageMaps();
  //});
  
    
  //  jQuery.noConflict();
  //  $(document).ready(function(e) {
   //   $('img[usemap]').rwdImageMaps();

//  });
 // this.wid1 = document.getElementById('playerbar').offsetWidth ;
 // this.hei1 = document.getElementById('playerbar').offsetHeight;
  
  }
  

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

  expandPiece(color){
    if(color == 'y'){this.showdoty = true;}
    if(color == 'r'){this.showdotr = true;}
    if(color == 'b'){this.showdotb = true;}
    if(color == 'g'){this.showdotg = true;}

  
    console.log(color);
  }

  contractPiece(color){
    if(color == 'y'){this.showdoty = false;}
    if(color == 'r'){this.showdotr = false;}
    if(color == 'b'){this.showdotb = false;}
    if(color == 'g'){this.showdotg = false;}

  
    console.log(color);
  }


}
