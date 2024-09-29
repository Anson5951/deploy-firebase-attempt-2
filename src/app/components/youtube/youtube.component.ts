import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-youtube',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './youtube.component.html',
    styleUrls: ['./youtube.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubeComponent implements AfterViewInit {

    @Input({ alias: 'exitKey', required: true }) exitKey: string = '';
    @ViewChild('iframe') iframe: ElementRef | undefined;
    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        if (event.key == this.exitKey) {
            this.inputVisible = true;
            if (this.iframe != null) {
                this.iframe.nativeElement.src = '';
            }
        }
    }

    // it should be a youtube url or a shared youtube link
    input = '';
    youtubeLink = '';
    inputVisible = true;

    ngAfterViewInit(): void {
        const vedioId = localStorage.getItem(this.exitKey);
        console.log('vedioId', vedioId);
        this.openVedio(vedioId ?? '')
    }

    onConfirm() {
        if (this.input.length == 0) return;
        const vedioId = this.convertInputToVedioId();
        this.openVedio(vedioId)
        localStorage.setItem(this.exitKey, vedioId)
    }

    onEnter(event: KeyboardEvent) {
        console.log(event);
        if (event.key === 'Enter') {
            this.onConfirm();
        }
    }

    private openVedio(vedioId: string) {
        if (vedioId != '') {
            this.inputVisible = false;
            if (this.iframe != null) {
                this.iframe.nativeElement.src = `https://www.youtube.com/embed/${vedioId}?si=${vedioId}&autoplay=1&mute=1&vq=720&loop=1&playlist=${vedioId}`;
            }
        }
    }

    private convertInputToVedioId() {
        // https://www.youtube.com/watch?v=qYspJLIHNyI&t=1231s
        if (this.input.startsWith('https://www.youtube.com/watch?v=') && this.input.includes('&')) {
            return this.input.split('https://www.youtube.com/watch?v=')[1].split('&')[0]
        }
        // https://www.youtube.com/watch?v=qYspJLIHNyI
        else if (this.input.startsWith('https://www.youtube.com/watch?v=')) {
            return this.input.split('https://www.youtube.com/watch?v=')[1]
        }
        // https://youtu.be/qYspJLIHNyI?si=_thQJaik6M8uRTj_&t=1236
        else if (this.input.startsWith('https://youtu.be/') && this.input.includes('&')) {
            return this.input.split('https://youtu.be/')[1].split('&')[0].split('?')[0]
        }
        // https://youtu.be/qYspJLIHNyI?si=_thQJaik6M8uRTj_
        else if (this.input.startsWith('https://youtu.be/')) {
            return this.input.split('https://youtu.be/')[1].split('?')[0]
        } else {
            console.log('something want wrong.', this.input)
            return '';
        }
    }
}
