import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, runTransaction, set } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/service/data.service';
import { RealTimeDataService } from 'src/service/real-time-data.service';
import { StorageService } from 'src/service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {

  file?: File;
  formGroup!: FormGroup;

  constructor(
    private dataService: DataService,
    private realTimeDataService: RealTimeDataService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      file: this.fb.control(this.file)
    })
    // cloud firestore : good!
    // this.testCloudFireStore();

    // real time database : data can't store on server. Data will not survive after reload.
    // this.testRealTimeDatabase();

  }

  private testCloudFireStore() {
    // this.dataService.getUsers().subscribe(data => {

    //   const user = new User(data);

    //   data.forEach((doc) => {
    //     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //   });
    // });
    // this.dataService.writeUser({
    //   first: 'david',
    //   last: 'johnson',
    //   born: 1895,
    // }).subscribe({
    //   next: docRef => console.log("Document written with ID: ", docRef.id),
    //   error: error => console.log('error: ', error)
    // });
  }

  private testRealTimeDatabase() {
    this.realTimeDataService.writeUserData('test01', 'test01', 'test01@gmail.com').subscribe(a => console.log('01: ' + a));
    this.realTimeDataService.writeUserData('test02', 'test02', 'test02@gmail.com').subscribe(a => console.log('02: ' + a));
    this.realTimeDataService.writeUserData('test03', 'test03', 'test03@gmail.com').subscribe(a => console.log('03: ' + a));
    this.realTimeDataService.getUserData('test01');
    const app = initializeApp(environment.firebaseConfig);
    const realTimeDatabase = getDatabase(app);
    const reference = ref(realTimeDatabase, '/' + 'ansonID');
    set(reference, {
      username: 'anson',
      email: 'anson@mail'
    }).then(() => {
      console.log('Data saved successfully!');
    }).catch((error) => {
      console.log('The write failed...');
    });
    runTransaction(reference, (post) => {
      if (post) {
        console.log('post: ' + JSON.stringify(post));
      }
      return post;
    }).then(() => {
      console.log('run runTransaction successfully!');
    }).catch((error) => {
      console.log('runTransaction failed...');
    });
    this.realTimeDataService.getDataByPath('/ansonID');
    this.realTimeDataService.getDataByPath('test');
    this.realTimeDataService.getDataByPath('users');
    this.realTimeDataService.getDataByPath('/test');
    this.realTimeDataService.getDataByPath('/users');
  }
}
