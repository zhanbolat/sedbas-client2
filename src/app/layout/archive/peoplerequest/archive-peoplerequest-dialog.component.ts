import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import {ArchPeopleRequest} from '../../../shared/model/arch-people_request';
import {ArchPeopleRequestService} from './archive-people_request.service';
import {ArchivePopupService} from '../archive-popup.service';

@Component({
    selector: 'app-archive-peoplerequest-dialog',
    templateUrl: './archive-peoplerequest-dialog.component.html'
})
export class ArchivePeopleRequestDialogComponent implements OnInit {

    peoplerequest: ArchPeopleRequest;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private peoplerequestService: ArchPeopleRequestService
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

        if (this.peoplerequest.peoplerequestid !== undefined) {
            this.peoplerequestService.update(this.peoplerequest)
                .subscribe((res: ArchPeopleRequest) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.peoplerequestService.create(this.peoplerequest)
                .subscribe((res: ArchPeopleRequest) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ArchPeopleRequest) {
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
        console.log('Error while getting peoplerequests: ' + error.message);
        // this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'app-archive-peoplerequest-popup',
    template: ''
})
export class ArchivePeopleRequestPopupComponent implements OnInit, OnDestroy {

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
                            .open(ArchivePeopleRequestDialogComponent as Component, this.docType, params['id']);
                    } else {
                        this.modalRef = this.blogPopupService
                            .open(ArchivePeopleRequestDialogComponent as Component, this.docType);
                    }
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}
