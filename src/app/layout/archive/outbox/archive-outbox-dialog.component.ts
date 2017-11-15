import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import {ArchOutbox} from '../../../shared/model/arch-outbox';
import {ArchOutboxService} from './archive-outbox.service';
import {ArchivePopupService} from '../archive-popup.service';

@Component({
    selector: 'app-archive-outbox-dialog',
    templateUrl: './archive-outbox-dialog.component.html'
})
export class ArchiveOutboxDialogComponent implements OnInit {

    outbox: ArchOutbox;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private outboxService: ArchOutboxService
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

        if (this.outbox.outboxid !== undefined) {
            this.outboxService.update(this.outbox)
                .subscribe((res: ArchOutbox) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.outboxService.create(this.outbox)
                .subscribe((res: ArchOutbox) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ArchOutbox) {
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
        console.log('Error while getting outboxs: ' + error.message);
        // this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'app-archive-outbox-popup',
    template: ''
})
export class ArchiveOutboxPopupComponent implements OnInit, OnDestroy {

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
                            .open(ArchiveOutboxDialogComponent as Component, this.docType, params['id']);
                    } else {
                        this.modalRef = this.blogPopupService
                            .open(ArchiveOutboxDialogComponent as Component, this.docType);
                    }
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}
