import { Component, OnInit, OnDestroy, Input, HostListener} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Howler, Howl } from 'howler';
import { IndexService } from '../../index/index.service'


@Component({
  selector: "app-cursedgamepage2",
  templateUrl: "cursedgamepage2.component.html",
  styleUrls: ['cursedgamepage2.component.css']
})
export class CursedgamepageComponent2 implements OnInit, OnDestroy {
  isCollapsed = true;
  
  startPage = true;
  gamePage = false;
  endPage = false;
  isError = false;
  err = "";
  errend = "";
  isEndError = false;

  pyramidclue = false;
  scorpionclue = false;
  firearrow = false;
  firearrowright = false;

  piece1 = false;
  piece2 = false;
  piece3 = false;
  piece4 = false;

  /////
 
  showSafe = false;
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
  constructor(private http: HttpClient, public indexService:IndexService) {
  
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
    
    if (piece == 'pyr') { this.pyramidclue = true; }
    if (piece == 'piece1') { this.piece1 = true; }
      if (piece == 'piece2') { this.piece2 = true; }
      if (piece == 'piece3') { this.piece3 = true; }
      if (piece == 'piece4') { this.piece4 = true; }
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
    if( this.cardclues == true){
      if (piece == 'card1') { this.card1 = false; }
      if (piece == 'card2') { this.card2 = false; }
      if (piece == 'card3') { this.card3 = false; }
      if (piece == 'card4') { this.card4 = false; }
    }
this.sound.play();
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
   
    if (item == 'pyr2') {
      if (code == "FIERY" || code == "fiery") {
      this.scorpionclue = true;
      this.firearrowright =true;
        this.success.play();
      } else {
        this.pyramidclue = false;
        this.error.play();
      }
    }
    if (item == 'pyr22') {
      if (code == "SPHINX" || code == "sphinx") {
      this.cardclues = true;
      this.firearrow =true;
        this.success.play();
      } else {
        
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
            isTeam = true;
            this.teamName = code;
      var result = doc.data();
          if (result['ptwo'] == game) {
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
        record['review2'] = review;
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
