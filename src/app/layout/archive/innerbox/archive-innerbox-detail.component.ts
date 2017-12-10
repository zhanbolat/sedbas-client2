import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchInnerbox} from '../../../shared/model/arch-innerbox';
import {ArchInnerboxService} from './archive-innerbox.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";
import {ArchAttachmentService} from "../attachment/archive-attachment.service";
import {ArchAttachment} from "../../../shared/model/arch-attachment";
import {Response} from "@angular/http";

@Component({
    selector: 'app-archive-innerbox-detail',
    templateUrl: './archive-innerbox-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveInnerboxDetailComponent implements OnInit, OnDestroy {
    innerbox: ArchInnerbox;
    private subscription: any;
    attachments: ArchAttachment[];

    constructor(
        private archBlankService: ArchInnerboxService,
        private archAttachmentService: ArchAttachmentService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            // this.innerbox = {innerboxid: 2, innerboxnumber: 111111, reporterfullname: 'Reporter name2', executorfullname: 'zzz fajs adsds'};
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((innerbox) => {
            this.innerbox = innerbox;

            this.archAttachmentService.find(innerbox.innerboxid, 3).subscribe(
                (res: Response) => {
                    this.attachments = res.json();

                    // for (let i = 0; i < this.attachments.length; i++) {
                    //     console.log('File content' + i + ': ' + this.attachments[i].filecontent);
                    //     console.log('File mimetype' + i + ': ' + this.attachments[i].mimetype);
                    //
                    //     var contentType = this.attachments[i].mimetype;
                    //     var b64Data = this.attachments[i].filecontent;
                    //
                    //     var blob = this.b64toBlob(b64Data, contentType, 512);
                    //     var blobUrl = URL.createObjectURL(blob);
                    //
                    //     // window.URL.createObjectURL(new Blob([this.attachments[i].filecontent]))
                    //     this.attachments[i].fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                    //         blobUrl
                    //     );
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
