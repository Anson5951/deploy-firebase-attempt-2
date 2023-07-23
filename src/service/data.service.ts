import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Database, getDatabase, off, onValue, ref, set } from "firebase/database";
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/interface/User';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  cloudFirestore: Firestore;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.cloudFirestore = getFirestore(app);
  }

  getUsers(): Observable<QuerySnapshot<DocumentData, DocumentData>> {
    return from(getDocs(collection(this.cloudFirestore, "users")));
  }

  writeUser(data: User) {
    return from(addDoc(collection(this.cloudFirestore, "users"), data));
  }

}
