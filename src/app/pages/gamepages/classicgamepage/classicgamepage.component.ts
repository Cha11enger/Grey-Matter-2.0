import { Component, OnInit, OnDestroy, Input} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IndexService } from '../../index/index.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-classicgamepage",
  templateUrl: "classicgamepage.component.html",
  styleUrls: ['classicgamepage.component.css']
})
export class ClassicgamepageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  pipe = new DatePipe('en-US');
  now;

  constructor(private http: HttpClient,  public indexservice: IndexService) {
  
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
  
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

  teamEndTime(teamCode, teamName){
    this.indexservice.fireservice.collection('player keys').doc(teamCode).valueChanges()
    .subscribe(result => {
        if (result['timeset'] != 'done' ) {
          var  record = {};
          this.now = Date.now();  
             //  record['endtime'] = this.pipe.transform(this.now, 'dd-MM-yyyy HH:mm:ss');
             record['endtime'] = this.now;
               record['teamname'] = teamName;
               record['timeset'] = 'done';
              this.indexservice.fireservice.collection('player keys').doc(teamCode).update(record);

        }
      }
    )

  }

  


}
