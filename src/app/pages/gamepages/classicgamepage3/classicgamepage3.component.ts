import { Component, OnInit, OnDestroy, Input} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import Chart from "chart.js";

@Component({
  selector: "app-classicgamepage3",
  templateUrl: "classicgamepage3.component.html",
  styleUrls: ['classicgamepage3.component.css']
})
export class ClassicgamepageComponent3 implements OnInit, OnDestroy {
  isCollapsed = true;
  constructor(private http: HttpClient) {
  
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
  
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

  expandPiece(piece){
console.log(piece);
  }


  


}
