import { Component, OnInit, OnDestroy, Input, HostListener} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Howler, Howl } from 'howler';
import { IndexService } from '../../index/index.service'


@Component({
  selector: "app-classicgamepage2",
  templateUrl: "classicgamepage2.component.html",
  styleUrls: ['classicgamepage2.component.css']
})
export class ClassicgamepageComponent2 implements OnInit, OnDestroy {
  isCollapsed = true;
  
  startPage = true;
  gamePage = false;
  endPage = false;
  isError = false;
  err = "";
  errend = "";
  isEndError = false;

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
    if (piece == 'safe') { this.showSafe = true; }
    //// delete above line later
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
      this.gamePage = false;
        this.endPage = true;
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

  checkTeamCode(code, game, c, d,) {
    var now;
    var isTeam = false;
    var isPlayer = false;
    this.indexService.fireservice.collection('player keys').doc(code).get()
    .toPromise().then(doc => {
      if (doc.exists) {
            isTeam = true;
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
              record['gamebox'] = 'classic';
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
