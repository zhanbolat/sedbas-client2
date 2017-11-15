import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import {ArchInnerbox} from '../../../shared/model/arch-innerbox';
import {ArchInnerboxService} from './archive-innerbox.service';
import {ArchivePopupService} from '../archive-popup.service';

@Component({
    selector: 'app-archive-innerbox-dialog',
    templateUrl: './archive-innerbox-dialog.component.html'
})
export class ArchiveInnerboxDialogComponent implements OnInit {

    innerbox: ArchInnerbox;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private innerboxService: ArchInnerboxService
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

        if (this.innerbox.innerboxid !== undefined) {
            this.innerboxService.update(this.innerbox)
                .subscribe((res: ArchInnerbox) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.innerboxService.create(this.innerbox)
                .subscribe((res: ArchInnerbox) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ArchInnerbox) {
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
        console.log('Error while getting innerboxs: ' + error.message);
        // this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'app-archive-innerbox-popup',
    template: ''
})
export class ArchiveInnerboxPopupComponent implements OnInit, OnDestroy {

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
                            .open(ArchiveInnerboxDialogComponent as Component, this.docType, params['id']);
                    } else {
                        this.modalRef = this.blogPopupService
                            .open(ArchiveInnerboxDialogComponent as Component, this.docType);
                    }
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}
