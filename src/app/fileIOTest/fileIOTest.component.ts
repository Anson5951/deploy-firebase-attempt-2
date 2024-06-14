import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/service/data.service';
import { RealTimeDataService } from 'src/service/real-time-data.service';
import { StorageService } from 'src/service/storage.service';

@Component({
  selector: 'app-file-iotest',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './fileIOTest.component.html',
  styleUrls: ['./fileIOTest.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileIOTestComponent {

  file?: File;
  formGroup!: FormGroup;

  constructor(
    private dataService: DataService,
    private realTimeDataService: RealTimeDataService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  onFileSelected(event: any) {
    // Good! upload success!
    // this.storageService.uploadFile(event.target.files[0]);

    // Well, guess I can only get the file on this event 0.0
    this.file = event.target.files[0];
  }
  uploadFile() {
    if (this.file)
      this.storageService.uploadFile(this.file);
  }
  downloadFile() {
    this.storageService.getTestFile().subscribe((arrayBuffer: ArrayBuffer) => {
      var blob = new Blob([arrayBuffer]);
      var objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl);
    });
  }
  openTwitch() {
    this.router.navigateByUrl('twitch');
  }
}
