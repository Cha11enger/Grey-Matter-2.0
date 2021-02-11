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

  pyramidclue = false;
  paperclue = false;
  firearrow = false;
  firearrowright = false;
  sunclue = false;
 
 reddot = false;
 
  cardclues = false;
  card1 = false;
  card2 = false;
  card3 = false;
  card4 = false;


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
    if (piece == 'pyr') { this.pyramidclue = true; }
    if (piece == 'paper') { this.paperclue = true; }
    if( this.cardclues == true){
      if (piece == 'card1') { this.card1 = true; }
      if (piece == 'card2') { this.card2 = true; }
      if (piece == 'card3') { this.card3 = true; }
      if (piece == 'card4') { this.card4 = true; }
    }
    if(  piece == 'safe' && this.cardclues == true){
      this.showSafe=true;      
    }
  this.sound.play();

  }

  hidePiece(piece) {
    if (piece == 'paper') { this.paperclue = false; }
    if( this.cardclues == true){
      if (piece == 'card1') { this.card1 = false; }
      if (piece == 'card2') { this.card2 = false; }
      if (piece == 'card3') { this.card3 = false; }
      if (piece == 'card4') { this.card4 = false; }
    }
      this.sound.play();
  }

  togglesun(num){

    if(this.sunclue == true){
    
    var ele = document.getElementById(num);   
    if(ele.classList.contains('sunred')){
     ele.classList.remove('sunred');           
      }else{
        ele.classList.add('sunred');
      
    }

    if(document.getElementById('sun2').classList.contains('sunred') &&
    document.getElementById('sun4').classList.contains('sunred') &&
    document.getElementById('sun6').classList.contains('sunred') &&
    document.getElementById('sun8').classList.contains('sunred') &&
    document.getElementById('sun11').classList.contains('sunred') 
    ){

      if(!document.getElementById('sun1').classList.contains('sunred') &&
    !document.getElementById('sun3').classList.contains('sunred') &&
    !document.getElementById('sun5').classList.contains('sunred') &&
    !document.getElementById('sun7').classList.contains('sunred') &&
    !document.getElementById('sun9').classList.contains('sunred') &&
    !document.getElementById('sun10').classList.contains('sunred') &&
    !document.getElementById('sun12').classList.contains('sunred') 
    ){
      this.success.play();
      this.reddot = true;
      this.firearrowright = true;
      this.cardclues = true;
    }

    }
  }

     this.sound.play();
    
   // document.getElementById('sun1').style.transform = "rotate("+deg+"deg)";
  }

  checkCode(code, item){
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
    if (item == 'pyr3') {
      if (code == "VALOR" || code == "valor") {
      this.sunclue = true;
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
