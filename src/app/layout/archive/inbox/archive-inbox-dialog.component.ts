import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import {ArchInbox} from '../../../shared/model/arch-inbox';
import {ArchInboxService} from './archive-inbox.service';
import {ArchivePopupService} from '../archive-popup.service';

@Component({
    selector: 'app-archive-inbox-dialog',
    templateUrl: './archive-inbox-dialog.component.html'
})
export class ArchiveInboxDialogComponent implements OnInit {

    inbox: ArchInbox;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private inboxService: ArchInboxService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;

        if (this.inbox.inboxid !== undefined) {
            this.inboxService.update(this.inbox)
                .subscribe((res: ArchInbox) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.inboxService.create(this.inbox)
                .subscribe((res: ArchInbox) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ArchInbox) {
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        console.log('Error while getting inboxs: ' + error.message);
        // this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'app-archive-inbox-popup',
    template: ''
})
export class ArchiveInboxPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;
    docType: string;
    sub: any;

    constructor(
        private route: ActivatedRoute,
        private blogPopupService: ArchivePopupService
    ) {}

    ngOnInit() {
        this.sub = this.route
            .data.subscribe(v => {
                this.docType = v.docType;

                this.routeSub = this.route.params.subscribe((params) => {
                    if ( params['id'] ) {
                        this.modalRef = this.blogPopupService
                            .open(ArchiveInboxDialogComponent as Component, this.docType, params['id']);
                    } else {
                        this.modalRef = this.blogPopupService
                            .open(ArchiveInboxDialogComponent as Component, this.docType);
                    }
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}
