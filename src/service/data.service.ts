import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { DocumentData, Firestore, QuerySnapshot, collection, getDocs, getFirestore } from "firebase/firestore";
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  db: Firestore;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
  }

  getUsers(): Observable<QuerySnapshot<DocumentData, DocumentData>> {
    return from(getDocs(collection(this.db, "users")));
  }
}
