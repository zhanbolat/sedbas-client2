import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import {ArchRequest} from '../../../shared/model/arch-request';
import {ArchRequestService} from './archive-request.service';
import {ArchivePopupService} from '../archive-popup.service';

@Component({
    selector: 'app-archive-request-dialog',
    templateUrl: './archive-request-dialog.component.html'
})
export class ArchiveRequestDialogComponent implements OnInit {

    request: ArchRequest;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private requestService: ArchRequestService
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

        if (this.request.id !== undefined) {
            this.requestService.update(this.request)
                .subscribe((res: ArchRequest) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.requestService.create(this.request)
                .subscribe((res: ArchRequest) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ArchRequest) {
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
        console.log('Error while getting requests: ' + error.message);
        // this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'app-archive-request-popup',
    template: ''
})
export class ArchiveRequestPopupComponent implements OnInit, OnDestroy {

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
                            .open(ArchiveRequestDialogComponent as Component, this.docType, params['id']);
                    } else {
                        this.modalRef = this.blogPopupService
                            .open(ArchiveRequestDialogComponent as Component, this.docType);
                    }
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}
