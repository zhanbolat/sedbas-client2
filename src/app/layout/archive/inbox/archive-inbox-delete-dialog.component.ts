import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { routerTransition } from '../../../router.animations';
import {ArchInbox} from '../../../shared/model/arch-inbox';
import {ArchivePopupService} from '../archive-popup.service';
import {ArchInboxService} from './archive-inbox.service';

@Component({
    selector: 'app-archive-inbox-delete-dialog',
    templateUrl: './archive-inbox-delete-dialog.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveInboxDeleteDialogComponent {

    inbox: ArchInbox;

    constructor(
                private inboxService: ArchInboxService,
                public activeModal: NgbActiveModal
    ) { }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inboxService.delete(id).subscribe((response) => {
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-archive-inbox-delete-popup',
    template: ''
})
export class ArchiveInboxDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;
    sub: any;
    docType: string;

    constructor(
        private route: ActivatedRoute,
        private blogPopupService: ArchivePopupService
    ) {}

    ngOnInit() {
        this.sub = this.route
            .data.subscribe(v => {
                this.docType = v.docType;
                this.routeSub = this.route.params.subscribe((params) => {
                    this.modalRef = this.blogPopupService
                        .open(ArchiveInboxDeleteDialogComponent as Component, this.docType, params['id']);
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}


