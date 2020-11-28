import { Component, OnInit, OnDestroy, Input} from "@angular/core";
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

  audio = new Audio();

  constructor(private http: HttpClient) {
  
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
  
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

  expandPiece(piece){
    if(piece == 'r'){  this.redkey = true;  }
    if(piece == 'y'){  this.yellowkey = true;  }
    if(piece == 'b'){  this.bluekey = true;  }
    if(piece == 'g'){  this.greenkey = true;  }

    
console.log(piece);

var sound = new Howl({
  src: ['sound.mp3']
});

sound.play();





  }


  hidePiece(piece){
    if(piece == 'r'){  this.redkey = false;  }
    if(piece == 'y'){  this.yellowkey = false;  }
    if(piece == 'b'){  this.bluekey = false;  }
    if(piece == 'g'){  this.greenkey = false;  }

  }
  


}
