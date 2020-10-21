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

  defaultUserCodes = [ 'test',
    'XtKD8ic2Uh','FLkCOzS24I','f43Ip9FGbf','AuQ8wMagSa','yNJeFg5pdO','79tDVRJtRC','ibaaHN3nRG','KRZWMHTZjp','uHVgkv3P2V','T5FuRNsrMG','kkd7tts20y','it9oFlLw1P','oAT0POKNN0','W2tRZsmpSZ','BV3oJfvGLd','zwRINW4lCM','KvBvcMhjhe','9iwEyEUTRv','xNSqzWyhaR','uSHef90pCP','EsfMKL7tq3','90s3tUUfig','SgC0VUnf1z','TzSfk3NjtN','3nipeF6d9U','Hp1MvaYuCP','tztcbWyKuc','LX8o4SGzAL','hIvi6wWR8l','Rf4oMD9a3J','gWHBVpQiTO','nrfsCkzjtA','lHY9IG0kOp','BoRaWeyazU','6lE9m0xLVT','J7uunHh2lr','VLSl8np98g','AEc71vAt99','lfKMQ3clyF','SCAH2fC0cG','6q2PswDrAq','8h5YeUSdVu','tmqVZEaHVP','gRLHQVtDkP','vfEuHxuk0L','MiNbmawjvL','HVQYRC9mXt','0QLIH9BvvP','K0lnuT3HeS','iCNeBc2LeB','cUBXGGAoXq','q7spLadLt0','Bsyu34vrGY','Iilc6abMGZ','xSBGEWIhY1','7nB1D0wguJ','LrpVpebcFc','QXrlcO3Hmp','D0tJ5XRKQO','Z1y3UP3bMd','mBBlF1YgT7','VSSyhtQHZw','9PbEOPUx9J','9tdhcG4hCu','pgc6ixzf5W','Qu9kmygHnx','Vp4PuSk2T3','gTQx1ZC3tQ','lwgkLsR93C','YCSMOdAkD7','645rjUe8tx','TiNexqZqiL','zsZjDD4Gdc','Ly4vNiAjFx','HL3IH0tEHO','mrZojpLhJ0','2C3IBOFvF5','11Iz5OJvq2','UurkvDb1Wu','ZnaFDcKRWl','gQPz6EbbPi','hGthHDdLUQ','GHLAxoINZZ','oTSC0ptIQ7','WGnmsKhZws','mnqxS1SAqf','D2sR3Pvkwa','9yw0JSKDS8','xY1fcnFLB1','BCPJ868dMP','WUzVXsBjAO','7Mz6JwjJWG','DydQmWe1NH','LPlFr5AR89','rtqp3INWHh','tHpzG8TKQn','yNa3ae5ndp','ubgiRuNnUX','3ybpfKdYqM','NOb1jazuyv'
  ];


  isVerified: boolean;
  constructor(private http: HttpClient) {
   this.isVerified = false;
  }

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
     
      if(this.defaultUserCodes.indexOf(code) !== -1){
        console.log("player verified ");
        this.isVerified = true;
    } else{
      console.log(" not verified ");
      this.isVerified = false;
    }
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
