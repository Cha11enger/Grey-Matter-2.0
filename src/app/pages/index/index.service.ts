import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable(
 // {  providedIn: 'root' }
)

export class IndexService {


  constructor(public fireservice : AngularFirestore) { }

  add_value_db(record){
    this.fireservice.collection('player keys').doc('test3').set(record);
    this.fireservice.collection('player keys').doc('test1').update({
      playerNumber : 'updated',   code : 'updated'
    });

  }

}