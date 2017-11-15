import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchInnerbox} from '../../../shared/model/arch-innerbox';
import {ArchInnerboxService} from './archive-innerbox.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-archive-innerbox-detail',
    templateUrl: './archive-innerbox-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveInnerboxDetailComponent implements OnInit, OnDestroy {
    innerbox: ArchInnerbox;
    private subscription: any;

    constructor(
        private archBlankService: ArchInnerboxService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            // this.innerbox = {innerboxid: 2, innerboxnumber: 111111, reporterfullname: 'Reporter name2', executorfullname: 'zzz fajs adsds'};
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((innerbox) => {
            this.innerbox = innerbox;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
