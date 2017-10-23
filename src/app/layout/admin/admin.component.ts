import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-user',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    animations: [routerTransition()]
})
export class AdminComponent implements OnInit, AfterViewInit {
    @ViewChild('mainframe') iframe: ElementRef;
    showFrame: boolean;

    constructor() {
    }

    ngOnInit() {
        this.showFrame = false;
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit ');
        // this.showFrame = true;
        // setTimeout(() =>
        //     {
        //         console.log('showFrame set true');
        //     },
        //     100);

        // console.log('showFrame ', this.showFrame);
    }

    onLoad()  {
        console.log('onLoad ');
        var doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow.document;
        // if (doc.getElementById('LoginHeader') !== null) {
        //     doc.getElementById('LoginHeader').style.display = 'none';
        //     console.log('disable login header');
        // }
        // if (doc.body.querySelector('#logo') !== null) {
        //     doc.body.querySelector('#logo').style.display = 'none';
        //     console.log('disable logo');
        // }
        // if (doc.body.querySelector('#LoginFormContainer') !== null) {
        //     doc.body.querySelector('#LoginFormContainer').style.width = '300px';
        //     console.log('resize login form controller');
        // }
        //
        // if (doc.getElementById('login') !== null) {
        //     doc.getElementById('login').style.display = 'none';
        // }
        if (doc.getElementById('menu') !== null) {
            doc.getElementById('menu').style.background = '#292b2c';
        }
        // console.log('scroll height0: ', doc.body.scrollHeight);

        const timerId = setInterval(() =>
            {
                // this.iframe.nativeElement.height = doc.body.scrollHeight + 'px';
                console.log('scroll height: ', doc.body.scrollHeight);
                if (doc.body.querySelector('#ProfileLink_Administrator') !== null) {
                    doc.body.querySelector('#ProfileLink_Administrator').click();
                    this.showFrame = true;
                    clearInterval(timerId);
                }
            },
            100);
    }
}
