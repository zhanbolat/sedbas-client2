import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchOutbox} from '../../../shared/model/arch-outbox';
import {ArchOutboxService} from './archive-outbox.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";
import {ArchAttachmentService} from "../attachment/archive-attachment.service";
import {Response} from "@angular/http";
import {ArchAttachment} from "../../../shared/model/arch-attachment";

@Component({
    selector: 'app-archive-outbox-detail',
    templateUrl: './archive-outbox-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveOutboxDetailComponent implements OnInit, OnDestroy {
    outbox: ArchOutbox;
    private subscription: any;
    attachments: ArchAttachment[];

    constructor(
        private archBlankService: ArchOutboxService,
        private archAttachmentService: ArchAttachmentService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            // this.outbox = {outboxid: 3, forwhom: 'Test test1', inboxnumber: '1234123', docownerfullname: 'Owner name1'};
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((outbox) => {
            this.outbox = outbox;

            this.archAttachmentService.find(outbox.outboxid, 4).subscribe(
                (res: Response) => {
                    this.attachments = res.json();

                    // for (let i = 0; i < this.attachments.length; i++) {
                    //     this.attachments[i].fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                    //         window.URL.createObjectURL(new Blob([this.attachments[i].filecontent])));
                    // }

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
