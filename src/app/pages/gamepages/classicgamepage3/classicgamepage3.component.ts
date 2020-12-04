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
  lockclue = false;
  arrow = false;
  scrollclue = false;
  hint1 = false;
  hint2 = false;
  hint3 = false;
  hintsection = false;

  showSafe = false;
  constructor(private http: HttpClient) {

  }
/*
  @HostListener('document:click')
  clickout() {
    var sound = new Howl({
      src: ['assets/audio/clicksound.mp3']
    });

    sound.play();
  } */
  sound = new Howl({
    src: ['assets/audio/clicksound.mp3']
  });
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
    if(  this.bookClue == true){   
    if (piece == 'y') { this.yellowkey = true; }  
    if (piece == 'g') { this.greenkey = true; }
    if (piece == 'b') { this.bluekey = true; }
    if (piece == 'r') { this.redkey = true; }
    if (piece == 'safe') { this.showSafe = true; }
    }
       
    if (piece == 'book'  && this.arrow == true) { this.showBook = true; }
    if (piece == 'scrollclue') { this.scrollclue = true; }
 if (piece == 'lockclue') { this.lockclue = true; }
  this.sound.play();

  }


  hidePiece(piece) {
  
    if (piece == 'y') { this.yellowkey = false; }
    if (piece == 'g') { this.greenkey = false; }   
   
      if (piece == 'r') { this.redkey = false; }
      if (piece == 'b') { this.bluekey = false; }
      this.sound.play();
  }

  checkCode(code, item){
    if(item == 'safe'){
      if(code == "5713"){
       
      this.success.play();
       }else{
         this.showSafe = false;
      
         this.error.play();
       }
    }
    if(item == 'lock'){
  
      if(code == "ITY" || code == "ity" ){
      this.arrow = true;

      this.success.play();
       }else{
         this.lockclue = false;
      
         this.error.play();
       }
    }
    if ( item == 'book'){
      if(code == "pizza" ||code == "PIZZA"|| code == "Pizza" ){
       
        
       this.success.play();
       this.showBook = false;
       this.bookClue = true;
  
       }else{
         this.showBook = false;   
         this.error.play();
       }
    }
  }

 

}
