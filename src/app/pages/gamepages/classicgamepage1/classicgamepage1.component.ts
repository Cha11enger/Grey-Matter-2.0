import { Component, OnInit, OnDestroy, Input, HostListener} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import Chart from "chart.js";
import * as $ from "jquery";
import * as jQuery from 'jquery';
import { Howler, Howl } from 'howler';
import { delay } from 'rxjs/operators';

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
  bottle = false;
  showSafe = false;
  showBulb = false;
  scrollclue = false;
  sequence = 0;
  p1_clues = false;
  correctCode = "Open!";
  finalcode = "";
  lockclue = false;
arrow = false;
  constructor(private http: HttpClient) {
  
  }

/*
  @HostListener('document:click')
  clickout() {
    var sound = new Howl({
      src: ['assets/audio/clicksound.mp3']
    });

    sound.play();
  }
*/
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
   
   
if(this.p1_clues == true){
  if (piece == 'safe') { this.showSafe = true; }
    if (piece == 'r') { this.redkey = true; }
    if (piece == 'y') { this.yellowkey = true; }
    if (piece == 'b') { this.bluekey = true; }
    if (piece == 'g') { this.greenkey = true; }
     }
 if (piece == 'bottle') { this.bottle = true; }
 if (piece == 'scrollclue') { this.scrollclue = true; }
 if (piece == 'lockclue') { this.lockclue = true; }
 this.sound.play();
  }


  hidePiece(piece) {
    if (piece == 'r') { this.redkey = false; }
    if (piece == 'y') { this.yellowkey = false; }
    if (piece == 'b') { this.bluekey = false; }
    if (piece == 'g') { this.greenkey = false; }
    if (piece == 'bottle') { this.bottle = false; }
    this.sound.play();
  }

// Added for Delay

  async delay_off(ms: number) {
      await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>this.showBulb = false);
  }

   async delay_on(ms: number) {
      await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>this.showBulb = true);
  }

  // Delay function ends here

  p1_sequence( seq ){ 
    this.sound.play();
   

    this.showBulb  = true;
    this.delay_off(200);
    // this.showBulb = false;

    if(this.arrow == true){
      


    if ( seq == "6"){  this.sequence = 1;  }

    if( seq == "2"){
      if (this.sequence == 1){ this.sequence = 2;}
      else this.sequence=0;
    }

    if( seq == "5" ){
      if ( this.sequence == 2){ this.sequence = 3;}
      else this.sequence=0;
    }

    if( seq == "1" ){
      if ( this.sequence == 3){ this.sequence = 4;}
      else this.sequence=0;
    }
    if( seq == "4" ){
      if ( this.sequence == 4){ this.sequence = 5;}
      else this.sequence=0;
    }
    if( seq == "3" ){
      if ( this.sequence == 5){ 
        this.sequence = 6;
        // this.showBulb  = true;
        this.p1_clues = true; 

      
        this.success.play();

      }
      else this.sequence=0;
    }
  }
    if(this.sequence == 6){
      this.delay_on(200);
      this.showBulb  = true;
      
    }
    // else{

    //   // this.showBulb  = true;
    //   // delay(5000);
    //   // this.showBulb = false;
    // }
  
    
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
  
      if(code == "IUT" || code == "iut" ){
      this.arrow = true;
      this.success.play();
       }else{
         this.lockclue = false;
      
         this.error.play();
       }
    }
   
  }

}
