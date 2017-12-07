import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchBlank} from '../../../shared/model/arch-blank';
// import {JhiLanguageService} from 'ng-jhipster';
import {ArchBlankService} from './archive-blank.service';
import {ActivatedRoute} from '@angular/router';
import {ArchAttachment} from "../../../shared/model/arch-attachment";
import {ArchAttachmentService} from "../attachment/archive-attachment.service";
import {Response} from "@angular/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-archive-detail',
    templateUrl: './archive-blank-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveDetailComponent implements OnInit, OnDestroy {
    blank: ArchBlank;
    private subscription: any;
    attachments: ArchAttachment[];

    constructor(
        private archBlankService: ArchBlankService,
        private archAttachmentService: ArchAttachmentService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            // this.blank = {blankid: params['id'], blanktype: 1, manufacturer: 'manufacturer1', exemplarcount: 5};
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((blank) => {
            this.blank = blank;

            this.archAttachmentService.find(blank.blankid, 2).subscribe(
                (res: Response) => {
                    this.attachments = res.json();

                    for (let i = 0; i < this.attachments.length; i++) {
                        this.attachments[i].fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                            window.URL.createObjectURL(new Blob([this.attachments[i].filecontent])));
                    }
                },
                (res: Response) => console.log('Error while getting archive document attachment: ' + res.json().message)
            );
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
