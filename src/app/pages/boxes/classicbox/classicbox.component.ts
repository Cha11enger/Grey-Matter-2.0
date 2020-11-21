import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IndexService } from '../../index/index.service'
import { DatePipe } from '@angular/common';


@Component({
  selector: "app-classicbox",
  templateUrl: "classicbox.component.html"
})
export class ClassicboxComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  returnText = 'hi';
  isApproved = false;
  isError = false;
 
  CurrentTime;
  pipe = new DatePipe('en-US');
  now;

 
  isVerified: boolean;
  constructor(private http: HttpClient, public indexservice: IndexService) {
    this.isVerified = false;
  }
  // var database = firebase.database();

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }
  /*
  checkPlayerCode(code, player) {
    console.log(code, player);
    if (code !== "") {
      console.log("check backend");

      if (this.defaultUserCodes.indexOf(code) !== -1) {
        console.log("player verified ");
        this.isVerified = true;
      } else {
        console.log(" not verified ");
        this.isVerified = false;
      }
      this.backendCall(code, player)

    }
  }
*/
  checkTeamCode(code, game) {
    /// verify code
    this.indexservice.fireservice.collection('player keys').doc(code).valueChanges()
      .subscribe(result => {
        console.log(result);
        if (result == undefined || result == null || result == "") {
          this.isApproved = false;
          this.isError = true;
          console.log('failed auth');
        }
        else if (result['exists'] == 'true') {
          this.isApproved = true;
          this.isError = false;

          var record = {}
   if (result['timeset'] == undefined ) {
        this.now = Date.now();  
       //  record['starttime'] = this.pipe.transform(this.now, 'dd-MM-yyyy HH:mm:ss');
       record['starttime'] = this.now;
         record['timeset'] = 'true';
         record['gamebox'] = 'classic';
        this.indexservice.fireservice.collection('player keys').doc(code).update(record);
   }

        } else {
          this.isApproved = false;
          this.isError = true;
          console.log('failed auth');
        }
        console.log(this.isApproved);


      }, error => {
        this.isApproved = false;
        this.isError = true;
        console.log('failed auth');
      })


  }


/*
  backendCall(code, player) {
    //console.log(value.message);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //  let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(code, player);
    this.http.post('127.0.0.1/myProject/callbackend.php', body)
      .subscribe({
        next: data => {   ///suceesss
          //  this.returnText = data;
        },
        error: error => {           ////error
          //  this.returnText = error.message;
          console.log(this.returnText);
        }
      });

  }
*/

}
