import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Database, Unsubscribe, getDatabase, onValue, ref, set } from "firebase/database";
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RealTimeDataService {

  realTimeDatabase: Database;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.realTimeDatabase = getDatabase(app);
  }


  writeUserData(userId: string, name: string, email: string) {
    return from(set(ref(this.realTimeDatabase, 'users/' + userId), {
      username: name,
      email: email
    }));
  }

  getUserData(userId: string) {
    const starCountRef = ref(this.realTimeDatabase, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const json = snapshot.toJSON();
      console.log('get users: ', json);
      const data = snapshot.val();
      console.log('get users: ', data);
    });
  }

  getDataByPath(path: string) {
    const starCountRef = ref(this.realTimeDatabase, path);
    onValue(starCountRef, (snapshot) => {
      const val = snapshot.val();
      console.log('data in ' + path + ': ', val);
    });
  }
}
