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
                        const b64Data = this.attachments[i].filecontent;

                        const blob = new Blob([this.base64ToArrayBuffer(b64Data)]);

                        this.attachments[i].fileUrl = this.sanitizer.bypassSecurityTrustUrl(
                            // window.URL.createObjectURL(new Blob([this.attachments[i].filecontent], {type: contentType})));
                            window.URL.createObjectURL(blob));
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

    base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const strArr = binaryString.substr(1, binaryString.length - 1).split(',');

        const binaryLen = strArr.length; // binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            bytes[i] = Number(strArr[i]); // binaryString.charCodeAt(i);
        }
        return bytes;
    }
}
