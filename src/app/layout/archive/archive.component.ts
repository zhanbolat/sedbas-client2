import {Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    styleUrls: ['./archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
