import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchInbox} from '../../../shared/model/arch-inbox';
import {ArchInboxService} from './archive-inbox.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-archive-inbox-detail',
    templateUrl: './archive-inbox-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveInboxDetailComponent implements OnInit, OnDestroy {
    inbox: ArchInbox;
    private subscription: any;

    constructor(
        private archBlankService: ArchInboxService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            // this.load(params['id']);
            this.inbox = {inboxid: 3, inboxnumber: 11231231, fromwhoom: 'Zzzg ssss', executorfullname: 'ad asd kjas'};
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((inbox) => {
            this.inbox = inbox;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
