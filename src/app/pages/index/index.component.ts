import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";
import { IndexService } from './index.service'
import { DatePipe } from '@angular/common';
import { Timestamp } from 'rxjs';

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
  playerNumber : String;
  playerCode : String;

  //public rows: Array<{rank: '0', teamname: '', time: ''}> = [];
  public rows: Array<any> = [];


  constructor( public indexservice: IndexService) {
    this.displayLeaderBoard()
  }
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    var slider = document.getElementById("sliderRegular");

  //  noUiSlider.create(slider, {
   //   start: 40,
    //  connect: false,
     // range: {
   //     min: 0,
   //     max: 100
  //    }
  //  });

    var slider2 = document.getElementById("sliderDouble");

  //  noUiSlider.create(slider2, {
  //    start: [20, 60],
  //    connect: true,
  //    range: {
   //     min: 0,
   //     max: 100
   //   }
  //  });
    this.dbWriteFunction();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  dbWriteFunction(){
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
    ) */
  }

  displayLeaderBoard(){
    var temprow = [];
   var rank;
   var teamname;
   var time;
   var seconds ;
   var d1,d2;
   this.indexservice.fireservice.collection('player keys').valueChanges().subscribe(result =>{
    
    
     result.forEach(function (value) {
       if(value['timeset'] != undefined &&  value['timeset'] != null && value['timeset'] != "" && value['timeset'] == 'done')
        {
          console.log( value );
         
         teamname = value['teamname'];
      
         d1 = new Date(value['endtime']);
         
         console.log( d1);
          d2 = new Date(value['starttime']);
          console.log( d2);

         seconds = (d1 - d2) / 1000;
         time = seconds/60;
         console.log( time );
          rank = 1;
      // rows1: Array<{rank: number, teamname: string, time: number}> = [];
     var one =  {rank: rank, teamname: teamname, time: time};
    
       temprow.push( one );    
       console.log("final array ----   " + temprow );
       console.log( temprow );

        }

         });
     
     });
   
 this.rows = temprow;
 console.log( "ROWSSSS" );
 console.log( this.rows );
  }

 


}
