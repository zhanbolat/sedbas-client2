import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchOutbox} from '../../../shared/model/arch-outbox';
import {ArchOutboxService} from './archive-outbox.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-archive-outbox-detail',
    templateUrl: './archive-outbox-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveOutboxDetailComponent implements OnInit, OnDestroy {
    outbox: ArchOutbox;
    private subscription: any;

    constructor(
        private archBlankService: ArchOutboxService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            // this.outbox = {outboxid: 3, forwhom: 'Test test1', inboxnumber: '1234123', docownerfullname: 'Owner name1'};
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((outbox) => {
            this.outbox = outbox;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
