import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IndexService } from '../../index/index.service';
import { DatePipe } from '@angular/common';
import { IndexComponent } from '../../index/index.component'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: "app-pyramidbox",
  templateUrl: "pyramidbox.component.html"
})
export class PyramidboxComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  returnText = 'hi';
  isApproved = false;
  isError = false;
 
  CurrentTime;
  pipe = new DatePipe('en-US');
  now;
  boxParam;
  boxName;
  isClassic = false;

  isVerified: boolean;
  constructor(private http: HttpClient, public indexservice: IndexService, private route: ActivatedRoute) {
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


}
