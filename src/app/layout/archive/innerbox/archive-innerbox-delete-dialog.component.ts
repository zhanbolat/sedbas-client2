import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { routerTransition } from '../../../router.animations';
import {ArchInnerbox} from '../../../shared/model/arch-innerbox';
import {ArchivePopupService} from '../archive-popup.service';
import {ArchInnerboxService} from './archive-innerbox.service';

@Component({
    selector: 'app-archive-innerbox-delete-dialog',
    templateUrl: './archive-innerbox-delete-dialog.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveInnerboxDeleteDialogComponent {

    innerbox: ArchInnerbox;

    constructor(
                private innerboxService: ArchInnerboxService,
                public activeModal: NgbActiveModal
    ) { }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.innerboxService.delete(id).subscribe((response) => {
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'app-archive-innerbox-delete-popup',
    template: ''
})
export class ArchiveInnerboxDeletePopupComponent implements OnInit, OnDestroy {

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
                        .open(ArchiveInnerboxDeleteDialogComponent as Component, this.docType, params['id']);
                });
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.sub.unsubscribe();
    }
}


