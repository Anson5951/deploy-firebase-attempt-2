import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
/**
 * Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/v0/b/test-for-firebase-845ca.appspot.com/o/images%2Fdog.jpg?alt=media&token=fe5d974e-7aa6-4648-9d7d-156dac30b6ca' from origin 'http://localhost:4200' has been blocked by CORS policy: Request header field access-control-allow-origin is not allowed by Access-Control-Allow-Headers in preflight response.
 */
getTestFile() {

    return from(getDownloadURL(ref(this.storage, 'images/dog.jpg'))).pipe(
      switchMap(url => (this.http.get(url, {
        headers: {
          'Access-Control-Allow-Origin': 'true'
        }
      })))
    );
  }
}
