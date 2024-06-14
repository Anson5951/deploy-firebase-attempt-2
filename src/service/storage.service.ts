import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getBlob, getBytes, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { from, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  storage: FirebaseStorage;

  constructor(
    private http: HttpClient
  ) {
    const app = initializeApp(environment.firebaseConfig);
    this.storage = getStorage(app, environment.bucketUrl);
  }

  uploadFile(file: File) {
    const storageRef = ref(this.storage, `images/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    });
  }

  getTestFile() {
    return from(getBytes(ref(this.storage, 'images/black_man_questions_mark.jpg')))
      // .pipe(
      //   switchMap(url => {
      //     debugger
      //     return this.http.post(url, {
      //       headers: {
      //         'Access-Control-Allow-Headers': 'Content-Type',
      //         'Access-Control-Allow-Methods': 'POST, GET, PUT',
      //         'Access-Control-Allow-Origin': '*'
      //       }
      //     })
      //   }))
      ;
  }
}
