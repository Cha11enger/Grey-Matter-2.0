import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";
import { IndexService } from './index.service'

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


  constructor( public indexservice: IndexService) {}
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
}
