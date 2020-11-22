import { Component, OnInit, OnDestroy, Input} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import Chart from "chart.js";
import * as $ from "jquery";
import * as jQuery from 'jquery';

@Component({
  selector: "app-classicgamepage1",
  templateUrl: "classicgamepage1.component.html",
  styleUrls: ['classicgamepage1.component.css']
})
export class ClassicgamepageComponent1 implements OnInit, OnDestroy {
  isCollapsed = true;
  wid1;
  hei1;
 
 

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

  yellow(){
    alert('yellowbox');
  }

  


}
