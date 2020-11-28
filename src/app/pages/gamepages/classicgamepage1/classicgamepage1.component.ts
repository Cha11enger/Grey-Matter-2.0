import { Component, OnInit, OnDestroy, Input, HostListener} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import Chart from "chart.js";
import * as $ from "jquery";
import * as jQuery from 'jquery';
import { Howler, Howl } from 'howler';

@Component({
  selector: "app-classicgamepage1",
  templateUrl: "classicgamepage1.component.html",
  styleUrls: ['classicgamepage1.component.css']
})
export class ClassicgamepageComponent1 implements OnInit, OnDestroy {
  isCollapsed = true;
  redkey = false;
  bluekey = false;
  yellowkey = false;
  greenkey = false;
 

  constructor(private http: HttpClient) {
  
  }
  @HostListener('document:click')
  clickout() {
    var sound = new Howl({
      src: ['assets/audio/clicksound.mp3']
    });

    sound.play();
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");

  
  }
  

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

  expandPiece(piece) {
    if (piece == 'r') { this.redkey = true; }
    if (piece == 'y') { this.yellowkey = true; }
    if (piece == 'b') { this.bluekey = true; }
    if (piece == 'g') { this.greenkey = true; }

    console.log(piece);

  }


  hidePiece(piece) {
    if (piece == 'r') { this.redkey = false; }
    if (piece == 'y') { this.yellowkey = false; }
    if (piece == 'b') { this.bluekey = false; }
    if (piece == 'g') { this.greenkey = false; }

  }


}
