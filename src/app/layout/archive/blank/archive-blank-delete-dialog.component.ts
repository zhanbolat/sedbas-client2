import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { routerTransition } from '../../../router.animations';
import {ArchBlank} from '../../../shared/model/arch-blank';
import {ArchivePopupService} from '../archive-popup.service';
import {ArchBlankService} from './archive-blank.service';

@Component({
    selector: 'app-archive-delete-dialog',
    templateUrl: './archive-blank-delete-dialog.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveBlankDeleteDialogComponent {

    blank: ArchBlank;

    constructor(
                private blankService: ArchBlankService,
                public activeModal: NgbActiveModal
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blankService.delete(id).subscribe((response) => {
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-archive-delete-popup',
    template: ''
})
export class ArchiveBlankDeletePopupComponent implements OnInit, OnDestroy {

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
                        .open(ArchiveBlankDeleteDialogComponent as Component, this.docType, params['id']);
                });
            });

    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}


