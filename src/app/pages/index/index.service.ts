import { Injectable, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'; 
//import { observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';
//import { Observable } from 'rxjs';
@Injectable(
  // {  providedIn: 'root' }
)

//interface Post {
//title: string;
//content: string;
//}

export class IndexService {

  //postsCol: AngularFirestoreCollection<Post>;
  //posts: Observable<Post[]>;

  constructor(public fireservice: AngularFirestore) { }
  
/*
  add_value_db(record) {
    var kkk4;
    var kkk5;
    this.fireservice.collection('player keys').doc('test3').set(record);
    this.fireservice.collection('player keys').doc('test1').update({
      playerNumber: 'updated', code: 'updated'
    });
    // var kkk = this.fireservice.collection('player keys').doc('test3').get().subscribe(result =>{
    //  kkk4 = result.get;
    // console.log(kkk4  );
    // console.log(result  );
    //  })

    var kkk = this.fireservice.collection('player keys').valueChanges().subscribe(result => {
      kkk4 = result;
      console.log(kkk4[0]);
      console.log(kkk4);
    })
    var kkk1 = this.fireservice.collection('player keys').doc('test3').valueChanges().subscribe(result => {
      kkk5 = result;
      console.log(kkk5);
    })



  } */
}