import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { routerTransition } from '../../../router.animations';
import {ArchRequest} from '../../../shared/model/arch-request';
import {ArchivePopupService} from '../archive-popup.service';
import {ArchRequestService} from './archive-request.service';

@Component({
    selector: 'app-archive-request-delete-dialog',
    templateUrl: './archive-request-delete-dialog.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveRequestDeleteDialogComponent {

    request: ArchRequest;

    constructor(
                private requestService: ArchRequestService,
                public activeModal: NgbActiveModal
    ) { }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.requestService.delete(id).subscribe((response) => {
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-archive-request-delete-popup',
    template: ''
})
export class ArchiveRequestDeletePopupComponent implements OnInit, OnDestroy {

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
                        .open(ArchiveRequestDeleteDialogComponent as Component, this.docType, params['id']);
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}


