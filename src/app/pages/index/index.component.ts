import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";
import { IndexService } from './index.service'
import { DatePipe } from '@angular/common';
import { Timestamp } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core'

@Component({
  selector: "app-index",
  templateUrl: "index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  playerNumber: String;
  playerCode: String;

  //public rows: Array<{rank: '0', teamname: '', time: ''}> = [];
  public rows: Array<any> = [];


  constructor(public indexservice: IndexService) {
    
  }
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    var slider = document.getElementById("sliderRegular");
    var slider2 = document.getElementById("sliderDouble");
    this.displayLeaderBoard();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
  /*
    dbWriteFunction() {
      let record = {};
      this.playerNumber = '3';
      this.playerCode = 'yoyoyoyoyooy';
      record['playerNumber'] = this.playerNumber;
      record['code'] = this.playerCode;
  
      this.indexservice.add_value_db(record)
  
      /*.then( res -> {
  
        this.playerNumber = '';
        this.code = '';
        console.log(res);
  
      }).catch( error->{
        console.log(error);
      })
      ) */ /*
}   */

  displayLeaderBoard() {
    var temprow = [];
    var rank;
    var teamname;
    var time;
    var seconds;
    var d1, d2;
    this.indexservice.fireservice.collection('player keys').get()
      .toPromise().then(col => {
        col.forEach(function (val) {
          if (val.exists) {
          
            var value = val.data();
            if (value['timeset'] != undefined && value['timeset'] != null && value['timeset'] != "" && value['timeset'] == 'done') {
///////////////////// ALL CLASSIC BOX
              if (value['enterlb'] == true) {
                teamname = value['teamname'];
                d1 = new Date(value['endtime']);
                d2 = new Date(value['starttime']);
                seconds = (d1 - d2) / 1000;
                time = seconds / 60;
                rank = 1;
                var one = { rank: rank, teamname: teamname, time: time };
                temprow.push(one);
              }

            }
          }
        });
        temprow.sort(function (a, b) {
          return parseFloat(a.time) - parseFloat(b.time);
        });
      }).catch(function (error) {
      });

    this.rows = temprow;
  }


  /*
display leader board old
{
  
var temprow = [];
    var rank;
    var teamname;
    var time;
    var seconds;
    var d1, d2;
    
    this.indexservice.fireservice.collection('player keys').valueChanges().subscribe(result => {
      result.forEach(function (value) {
       // console.log(value);
        if (value['timeset'] != undefined && value['timeset'] != null && value['timeset'] != "" && value['timeset'] == 'done') {

          if( value['enterlb'] == true ){
          teamname = value['teamname'];
          d1 = new Date(value['endtime']);
          d2 = new Date(value['starttime']);
          seconds = (d1 - d2) / 1000;
          time = seconds / 60;
          rank = 1;        
          var one = { rank: rank, teamname: teamname, time: time };
          temprow.push(one);
          }     
        }
      });
      temprow.sort(function(a, b) {
          return parseFloat(a.time) - parseFloat(b.time);
    });
    });

    this.rows = temprow;
}

  */



}
