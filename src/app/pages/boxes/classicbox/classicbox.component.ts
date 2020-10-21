import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import Chart from "chart.js";

@Component({
  selector: "app-classicbox",
  templateUrl: "classicbox.component.html"
})
export class ClassicboxComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  returnText = 'hi';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
  
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }
  checkPlayerCode(code,player){
    console.log(code , player);
    if( code !== ""){
      console.log("check backend");
      this. backendCall(code, player)
   
    }
  }
 

  
  backendCall(code, player) {
    //console.log(value.message);
    let headers = new Headers({ 'Content-Type': 'application/json'});
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


}
