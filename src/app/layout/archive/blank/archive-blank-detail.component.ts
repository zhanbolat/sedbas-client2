import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchBlank} from '../../../shared/model/arch-blank';
// import {JhiLanguageService} from 'ng-jhipster';
import {ArchBlankService} from './archive-blank.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-archive-detail',
    templateUrl: './archive-blank-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveDetailComponent implements OnInit, OnDestroy {
    blank: ArchBlank;
    private subscription: any;

    constructor(
        private archBlankService: ArchBlankService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            // this.load(params['id']);
            this.blank = {blankid: params['id'], blanktype: 1, manufacturer: 'manufacturer1', exemplarcount: 5};
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((blank) => {
            this.blank = blank;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
