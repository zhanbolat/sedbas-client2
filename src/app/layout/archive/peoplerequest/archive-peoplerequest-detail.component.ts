import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchPeopleRequest} from '../../../shared/model/arch-people_request';
import {ArchPeopleRequestService} from './archive-people_request.service';
import {ActivatedRoute} from '@angular/router';
import {ArchAttachmentService} from "../attachment/archive-attachment.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ArchAttachment} from "../../../shared/model/arch-attachment";
import {Response} from "@angular/http";

@Component({
    selector: 'app-archive-peoplerequest-detail',
    templateUrl: './archive-peoplerequest-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchivePeopleRequestDetailComponent implements OnInit, OnDestroy {
    peoplerequest: ArchPeopleRequest;
    private subscription: any;
    attachments: ArchAttachment[];

    constructor(
        private archBlankService: ArchPeopleRequestService,
        private archAttachmentService: ArchAttachmentService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            // this.peoplerequest = {peoplerequestid: 10, documentnumber: '12222222', forwhoom: 'David', executorfullname: 'Name 1',
            //     address: 'Address 1, US'};
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((peoplerequest) => {
            this.peoplerequest = peoplerequest;

            this.archAttachmentService.find(peoplerequest.peoplerequestid, 5).subscribe(
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
