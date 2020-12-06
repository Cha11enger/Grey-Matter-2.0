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
  selector: "app-classicgamepage1",
  templateUrl: "classicgamepage1.component.html",
  styleUrls: ['classicgamepage1.component.css']
})
export class ClassicgamepageComponent1 implements OnInit, OnDestroy {


  startPage = true;
  gamePage = false;
  endPage = false;
  isError = false;
  err = "";
  errend = "";
  isEndError = false;

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
  hint1 = false;
  hint2 = false;
  hint3 = false;
  hintsection = false;
  arrow = false;
  

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
    if (piece == 'safe') { this.showSafe = true; }
    //////////////// delete above lon

    if (this.p1_clues == true) {
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
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.showBulb = false);
  }
  async delay_on(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.showBulb = true);
  }

  // Delay function ends here

  p1_sequence(seq) {
    this.sound.play();
    this.showBulb = true;
    this.delay_off(200);
    if (this.arrow == true) {
      if (seq == "6") { this.sequence = 1; }
      if (seq == "2") {
        if (this.sequence == 1) { this.sequence = 2; }
        else this.sequence = 0;
      }
      if (seq == "5") {
        if (this.sequence == 2) { this.sequence = 3; }
        else this.sequence = 0;
      }
      if (seq == "1") {
        if (this.sequence == 3) { this.sequence = 4; }
        else this.sequence = 0;
      }
      if (seq == "4") {
        if (this.sequence == 4) { this.sequence = 5; }
        else this.sequence = 0;
      }
      if (seq == "3") {
        if (this.sequence == 5) {
          this.sequence = 6;
          this.p1_clues = true;
          this.success.play();
        }
        else this.sequence = 0;
      }
    }
    if (this.sequence == 6) {
      this.delay_on(200);
      this.showBulb = true;
    }
  }

  checkCode(code, item) {
    if (item == 'safe') {
      if (code == "5713") {
        this.success.play();
        this.gamePage = false;
        this.endPage = true;
      } else {
        this.showSafe = false;
        this.error.play();
      }
    }
    if (item == 'lock') {
      if (code == "IUT" || code == "iut") {
        this.arrow = true;
        this.success.play();
      } else {
        this.lockclue = false;
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
              record['gamebox'] = 'classic';
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

   /*
 checkTeamCode(code, game, c, d,) {
    var CurrentTime;
    var now;
    var isTeam = false;
    var isPlayer = false;
    this.indexService.fireservice.collection('player keys').doc(code).valueChanges()
      .subscribe(result => {
        console.log(result);
        if (result == undefined || result == null || result == "") {
          isTeam = false;
          this.isError = true;
          this.err = 'team';
          console.log('failed auth');
        }
        else if (result['exists'] == 'true') {
          isTeam = true;
          console.log('team  true');
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
            console.log('player not available ');
          }
        } else {
          isTeam = false;
          this.isError = true;
          this.err = 'team';
          console.log('failed auth');
        }
      }, error => {
        isTeam = false;
        this.isError = true;
        this.err = 'team';
        console.log('failed auth');
      })
  }


   */

  /*
  teamEndTime(teamCode, review, leaderboard, gamebox) {
   
    var now;
    this.indexService.fireservice.collection('player keys').doc(teamCode).valueChanges()
      .subscribe(result => {
        if (result == undefined || result == null || result == "") {
          this.errend = 'Team doesnt exist';
          this.isEndError = true;
        } else {
          if (result['timeset'] != 'done') {
            var record = {};
            now = Date.now();
            //  record['endtime'] = this.pipe.transform(this.now, 'dd-MM-yyyy HH:mm:ss');
            record['endtime'] = now;
            record['review'] = review;
            record['enterlb'] = leaderboard;
            record['timeset'] = 'done';
            this.indexService.fireservice.collection('player keys').doc(teamCode).update(record);
           
            }
          this.errend = 'Thankyou ! Do try our other Boxes';
          this.isEndError = true;
         }
      }, error => {
        this.errend = 'Team doesnt exist';
        this.isEndError = true;
      }
      )
  }   */

  
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
