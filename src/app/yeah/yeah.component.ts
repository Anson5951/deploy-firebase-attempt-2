import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-yeah',
    templateUrl: './yeah.component.html',
    styleUrls: ['./yeah.component.css']
})
export class YeahComponent {

    layoutSelectorVisibility = false
    selectedLayout: 'quarter' | 'height' | 'wide' = 'quarter'
    vedioUsedClass: 'video-quarter-layout' | 'video-wide-layout' | 'video-height-layout' = 'video-quarter-layout'

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        console.log('KeyboardEvent', event);
        if (event.key == '`') {
            this.layoutSelectorVisibility = !this.layoutSelectorVisibility;
        } else if (event.key == `Escape`) {
            this.layoutSelectorVisibility = false;
        }
    }

    layoutSelection_onClick(layout: 'quarter' | 'height' | 'wide') {
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
        }
    }
}
