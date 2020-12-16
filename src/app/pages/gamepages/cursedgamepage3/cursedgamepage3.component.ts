import { Component, OnInit, OnDestroy, Input, HostListener } from "@angular/core";
import { HttpClient, HttpDownloadProgressEvent } from '@angular/common/http';
import Chart from "chart.js";
import { Howler, Howl } from 'howler';
import { IndexService } from '../../index/index.service'

@Component({
  selector: "app-cursedgamepage3",
  templateUrl: "cursedgamepage3.component.html",
  styleUrls: ['cursedgamepage3.component.css']
})
export class CursedgamepageComponent3 implements OnInit, OnDestroy {
  isCollapsed = true;

  startPage = true;
  gamePage = false;
  endPage = false;
  isError = false;
  err = "";
  errend = "";
  isEndError = false;

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
  teamName = "";
  showSafe = false;
  constructor(private http: HttpClient, public indexService:IndexService) {

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
  
    //// delete above line later
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
      this.gamePage = false;
        this.endPage = true;
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

  checkTeamCode(code, game, c, d,) {
    var now;
    var isTeam = false;
    var isPlayer = false;
    this.indexService.fireservice.collection('player keys').doc(code).get()
    .toPromise().then(doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
          isTeam = true;
          this.teamName = code;
      var result = doc.data();
          if (result['pthree'] == game) {
            isPlayer = true;
            this.isError = false;
            this.startPage = false;
            this.gamePage = true;
            var record = {}
            if (result['timeset'] == undefined) {
              now = Date.now();
              //  record['starttime'] = this.pipe.transform(this.now, 'dd-MM-yyyy HH:mm:ss');
              record['starttime'] = now;
              record['timeset'] = 'true';
              record['gamebox'] = 'cursed';
              record['teamname'] = code;
              this.indexService.fireservice.collection('player keys').doc(code).update(record);
            }
          } else {
            isPlayer = false;
            this.isError = true;
            this.err = 'Player 2 ';
            console.log('player not available ');
          }
             
      } else {
        isTeam = false;
        this.isError = true;
        this.err = 'Team';
      }
    }).catch(function(error) {
     
        isTeam = false;
       this.Error = true;
        this.err = 'Team';    
    });
  }

  teamEndTime(teamCode, review, leaderboard, gamebox) {
    var now;
    this.indexService.fireservice.collection('player keys').doc(teamCode).get()
    .toPromise().then(doc => {
      if (doc.exists) {
        var result = doc.data();
        var record = {};
        record['review3'] = review;
        record['enterlb'] = leaderboard;
        if (result['timeset'] != 'done') {
          now = Date.now();
          //  record['endtime'] = this.pipe.transform(this.now, 'dd-MM-yyyy HH:mm:ss');
          record['endtime'] = now; 
          record['timeset'] = 'done';          
          }
        this.indexService.fireservice.collection('player keys').doc(teamCode).update(record);
        this.errend = 'Thankyou ! Do try our other Boxes';
        this.isEndError = true;
      }
      else {
        this.errend = 'Team doesnt exist';
          this.isEndError = true;        
      }
    }).catch(function(error) {
      this.errend = 'Team doesnt exist';
      this.isEndError = true;           
    });
  }
}
