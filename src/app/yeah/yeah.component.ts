import { Component, HostListener } from '@angular/core';
import { YoutubeComponent } from '../components/youtube/youtube.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-yeah',
    templateUrl: './yeah.component.html',
    styleUrls: ['./yeah.component.css'],
    standalone: true,
    imports: [
        YoutubeComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class YeahComponent {

    layoutSelectorVisibility = false
    selectedLayout: 'quarter' | 'height' | 'wide' | 'three-column' = 'quarter'
    vedioUsedClass: 'video-quarter-layout' | 'video-wide-layout' | 'video-height-layout' | 'video-three-column-layout' = 'video-quarter-layout'

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        console.log('KeyboardEvent', event);
        if (event.key == '`') {
            this.layoutSelectorVisibility = !this.layoutSelectorVisibility;
        } else if (event.key == `Escape`) {
            this.layoutSelectorVisibility = false;
        }
    }

    layoutSelection_onClick(layout: 'quarter' | 'height' | 'wide' | 'three-column') {
        switch (layout) {
            case 'quarter':
                console.log('quarter');
                this.selectedLayout = 'quarter'
                this.vedioUsedClass = 'video-quarter-layout'
                break;
            case 'height':
                console.log('height');
                this.selectedLayout = 'height'
                this.vedioUsedClass = 'video-height-layout'
                break;
            case 'wide':
                console.log('wide');
                this.selectedLayout = 'wide'
                this.vedioUsedClass = 'video-wide-layout'
                break;
            case 'three-column':
                console.log('three-column');
                this.selectedLayout = 'three-column'
                this.vedioUsedClass = 'video-three-column-layout'
                break;
        }
    }
}
