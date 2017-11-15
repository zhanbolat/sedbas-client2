import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { routerTransition } from '../../../router.animations';
import {ArchPeopleRequest} from '../../../shared/model/arch-people_request';
import {ArchivePopupService} from '../archive-popup.service';
import {ArchPeopleRequestService} from './archive-people_request.service';

@Component({
    selector: 'app-archive-peoplerequest-delete-dialog',
    templateUrl: './archive-peoplerequest-delete-dialog.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchivePeopleRequestDeleteDialogComponent {

    peoplerequest: ArchPeopleRequest;

    constructor(
                private peoplerequestService: ArchPeopleRequestService,
                public activeModal: NgbActiveModal
    ) { }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.peoplerequestService.delete(id).subscribe((response) => {
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-archive-peoplerequest-delete-popup',
    template: ''
})
export class ArchivePeopleRequestDeletePopupComponent implements OnInit, OnDestroy {

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
                        .open(ArchivePeopleRequestDeleteDialogComponent as Component, this.docType, params['id']);
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}


