import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { routerTransition } from '../../../router.animations';
import {ArchOutbox} from '../../../shared/model/arch-outbox';
import {ArchivePopupService} from '../archive-popup.service';
import {ArchOutboxService} from './archive-outbox.service';

@Component({
    selector: 'app-archive-outbox-delete-dialog',
    templateUrl: './archive-outbox-delete-dialog.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveOutboxDeleteDialogComponent {

    outbox: ArchOutbox;

    constructor(
                private outboxService: ArchOutboxService,
                public activeModal: NgbActiveModal
    ) { }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.outboxService.delete(id).subscribe((response) => {
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-archive-outbox-delete-popup',
    template: ''
})
export class ArchiveOutboxDeletePopupComponent implements OnInit, OnDestroy {

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
                        .open(ArchiveOutboxDeleteDialogComponent as Component, this.docType, params['id']);
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}


