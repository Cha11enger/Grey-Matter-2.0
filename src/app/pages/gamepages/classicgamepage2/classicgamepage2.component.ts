import { Component, OnInit, OnDestroy, Input, ElementRef} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import Chart from "chart.js";
import { DefaultUrlSerializer } from '@angular/router';


@Component({
  selector: "app-classicgamepage2",
  templateUrl: "classicgamepage2.component.html",
  styleUrls: ['classicgamepage2.component.css']
})
export class ClassicgamepageComponent2 implements OnInit, OnDestroy {
  isCollapsed = true;
  constructor(private http: HttpClient, private ele : ElementRef) {
  
  }
  showCard = false;
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
  
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

  expandPiece(card){
 
    console.log(card);
    this.showCard = true;
   

  }

  


}
