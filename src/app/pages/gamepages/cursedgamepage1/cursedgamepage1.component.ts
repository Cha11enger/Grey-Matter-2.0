import { Component, OnInit, OnDestroy, Input, HostListener } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import Chart from "chart.js";
import * as $ from "jquery";
import * as jQuery from 'jquery';
import { Howler, Howl } from 'howler';
import { delay } from 'rxjs/operators';
import { IndexService } from '../../index/index.service'
import { snapshotChanges } from '@angular/fire/database';

@Component({
  selector: "app-cursedgamepage1",
  templateUrl: "cursedgamepage1.component.html",
  styleUrls: ['cursedgamepage1.component.css']
})
export class CursedgamepageComponent1 implements OnInit, OnDestroy {


  startPage = true;
  gamePage = false ;
  endPage = false;

  //// change later
  isError = false;
  err = "";
  errend = "";
  isEndError = false;

  
  showSafe = false;
  hint1 = false;
  hint2 = false;
  hint3 = false;
  hintsection = false;
  


  teamName = "";
  pyramidclue = false;
  scorpionclue = false;
  blue1= false;
  blue2= false;
  blue3= false;
  blue4= false;
  blue5= false;
  red1= false;
  red2= false;
  red3= false;
  red4= false;
  red5= false;
  mapsmall = false;
  mapbig = false;
  paperclue = false;
  firearrow = false;
  firearrowright = false;
  constructor(private http: HttpClient, public indexService: IndexService) {

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
    
    if(  piece == 'mapsmall' && this.mapsmall == true){
      this.mapbig=true;      
    }  

    if (piece == 'pyr') { this.pyramidclue = true; }
    if (piece == 'paper') { this.paperclue = true; }
    
    this.sound.play();
    if (piece == 'colour') {
    if( this.red1 && this.red3 && this.red5 && this.blue4 && this.blue5){
      
      if(   !this.red2 && !this.red4 && !this.blue1 && !this.blue2 && !this.blue3 ){
        this.success.play();
        this.mapsmall = true;
        this.firearrowright = true;
      }

    }
  }
  if(  piece == 'safe' && this.mapbig == true){
    this.showSafe=true;      
  }  
  }

  hidePiece(piece) {
    if (piece == 'mapbig') { this.mapbig = false; }
    if (piece == 'paper') { this.paperclue = false; }
   
    this.sound.play();
  }

  checkCode(code, item) {
    if (item == 'safe') {
      if (code == "1794") {
        this.success.play();
        this.gamePage = false;
        this.endPage = true;
      } else {
        this.showSafe = false;
        this.error.play();
      }
    }
    if (item == 'pyr1') {
      if (code == "BRAVE" || code == "brave") {
      this.scorpionclue = true;
      this.firearrow =true;
        this.success.play();
      } else {
        this.pyramidclue = false;
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
          console.log(doc.data['pone']);
          console.log(doc.data()['pone']);
      var result = doc.data();
          if (result['pone'] == game) {
            console.log('play  true');
            isPlayer = true;
            this.isError = false;
            this.startPage = false;
            this.gamePage = true;
            var record = {}
            if (result['timeset'] == undefined) {
              console.log('time  true');
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
            this.err = 'Player 1 ';
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
        record['review1'] = review;
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
