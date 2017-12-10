import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchInbox} from '../../../shared/model/arch-inbox';
import {ArchInboxService} from './archive-inbox.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {ArchAttachmentService} from '../attachment/archive-attachment.service';
import {ArchAttachment} from '../../../shared/model/arch-attachment';
import {Response} from '@angular/http';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-archive-inbox-detail',
    templateUrl: './archive-inbox-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveInboxDetailComponent implements OnInit, OnDestroy {
    inbox: ArchInbox;
    private subscription: any;
    // fileUrl: any;
    attachments: ArchAttachment[];


    constructor(
        private archBlankService: ArchInboxService,
        private archAttachmentService: ArchAttachmentService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);

            // this.inbox = {inboxid: 3, inboxnumber: 11231231, fromwhoom: 'Zzzg ssss', executorfullname: 'ad asd kjas'};
            // this.attachments = [
            //     {attachmentid: 1, filename:'file_name.jpg', mimetype:'image/jpeg', filecontent: ['']},
            //     {attachmentid: 1, filename:'filename.txt', mimetype:'text/plain', filecontent: ['text sample']}
            //     ];
            //
            // for (let i = 0; i < this.attachments.length; i++) {
            //     this.attachments[i].fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            //         window.URL.createObjectURL(new Blob([this.attachments[i].filecontent])));
            // }
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((inbox) => {
            this.inbox = inbox;

            this.archAttachmentService.find(inbox.inboxid, 1).subscribe(
                (res: Response) => {
                    this.attachments = res.json();

                    for (let i = 0; i < this.attachments.length; i++) {

                        const contentType = this.attachments[i].mimetype;
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
