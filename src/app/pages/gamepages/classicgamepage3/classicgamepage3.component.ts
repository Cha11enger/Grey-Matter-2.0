import { Component, OnInit, OnDestroy, Input, HostListener } from "@angular/core";
import { HttpClient, HttpDownloadProgressEvent } from '@angular/common/http';
import Chart from "chart.js";
import { Howler, Howl } from 'howler';

@Component({
  selector: "app-classicgamepage3",
  templateUrl: "classicgamepage3.component.html",
  styleUrls: ['classicgamepage3.component.css']
})
export class ClassicgamepageComponent3 implements OnInit, OnDestroy {
  isCollapsed = true;
  redkey = false;
  bluekey = false;
  yellowkey = false;
  greenkey = false;
  showBook = false;
  bookClue = false;
 

  showSafe = false;
  constructor(private http: HttpClient) {

  }

  @HostListener('document:click')
  clickout() {
    var sound = new Howl({
      src: ['assets/audio/clicksound.mp3']
    });

    sound.play();
  }
  success = new Howl({
    src: ['assets/audio/success.mp3']
  });
  error = new Howl({
    src: ['assets/audio/error.mp3']
  });
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
    if (piece == 'safe') { this.showSafe = true; }
    if (piece == 'book') { this.showBook = true; }
    console.log(piece);

  }


  hidePiece(piece) {
    if (piece == 'r') { this.redkey = false; }
    if (piece == 'y') { this.yellowkey = false; }
    if (piece == 'b') { this.bluekey = false; }
    if (piece == 'g') { this.greenkey = false; }

  }

  checkCode(code){
    if(code == "5713"){
     console.log('correct');
    
    this.success.play();
    }else{
      this.showSafe = false;
     
  
      this.error.play();
    }
  }

  checkBookCode(code){
    if(code == "pizza" ||code == "PIZZA"|| code == "Pizza" ){
      console.log('correct');
      
     this.success.play();
     this.showBook = false;
     this.bookClue = true;

     }else{
       this.showBook = false;   
       this.error.play();
     }
  }


}
