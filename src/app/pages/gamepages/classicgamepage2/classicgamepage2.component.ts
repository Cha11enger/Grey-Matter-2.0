import { Component, OnInit, OnDestroy, Input, HostListener} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Howler, Howl } from 'howler';


@Component({
  selector: "app-classicgamepage2",
  templateUrl: "classicgamepage2.component.html",
  styleUrls: ['classicgamepage2.component.css']
})
export class ClassicgamepageComponent2 implements OnInit, OnDestroy {
  isCollapsed = true;
  
  key1 = false;
  key2 = false;
  key3 = false;
  key4 = false;
  key5 = false;
  key6 = false;
  key7 = false;
  key8 = false;
  books = false;
  bottle = false;
  showSafe = false;
  cardClue = false;
  lockclue = false;
  arrow = false;
  scrollclue = false;
  hint1 = false;
  hint2 = false;
  hint3 = false;
  hintsection = false;
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
   
      
  if(  this.cardClue == true){
    if (piece == '1') { this.key1 = true; }
    if (piece == '3') { this.key3 = true; }
    if (piece == '2') { this.key2 = true; }
    if (piece == '4') { this.key4 = true; }
    if (piece == '5') { this.key5 = true; }
    if (piece == '6') { this.key6 = true; }
    if (piece == '7') { this.key7 = true; }
    if (piece == '8') { this.key8 = true; }
    if (piece == 'safe') { this.showSafe = true; }
  }

   
    if (piece == 'books') { this.books = true; }
    if (piece == 'bottle' && this.arrow == true) { this.bottle = true; }
    if (piece == 'scrollclue') { this.scrollclue = true; }
 if (piece == 'lockclue') { this.lockclue = true; }
 this.sound.play();
  }


  hidePiece(piece) {
    if (piece == '1') { this.key1 = false; }
    if (piece == '2') { this.key2 = false; }
    if (piece == '3') { this.key3 = false; }
    if (piece == '4') { this.key4 = false; }
    if (piece == '5') { this.key5 = false; }
    if (piece == '6') { this.key6 = false; }
    if (piece == '7') { this.key7 = false; }
    if (piece == '8') { this.key8 = false; }
    if (piece == 'books') { this.books = false; }
    if (piece == 'bottle') { this.bottle = false; }
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
  
      if(code == "VLI" || code == "vli" ){
      this.arrow = true;

      this.success.play();
       }else{
         this.lockclue = false;
      
         this.error.play();
       }
    }
    if ( item == 'bottle'){
      if(code == "3013"){
     
       this.success.play();
       this.bottle = false;
       this.cardClue = true;
  
       }else{
         this.bottle = false;   
         this.error.play();
       }
    }
  }
  
  
}
