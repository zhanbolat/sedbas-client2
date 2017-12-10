import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchRequest} from '../../../shared/model/arch-request';
import {ArchRequestService} from './archive-request.service';
import {ActivatedRoute} from '@angular/router';
import {Response} from "@angular/http";
import {DomSanitizer} from "@angular/platform-browser";
import {ArchAttachmentService} from "../attachment/archive-attachment.service";
import {ArchAttachment} from "../../../shared/model/arch-attachment";

@Component({
    selector: 'app-archive-request-detail',
    templateUrl: './archive-request-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveRequestDetailComponent implements OnInit, OnDestroy {
    request: ArchRequest;
    private subscription: any;
    attachments: ArchAttachment[];

    constructor(
        private archBlankService: ArchRequestService,
        private archAttachmentService: ArchAttachmentService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            // this.request = {id: 2, studentid: 2222, studentsurname: 'surname1 ', studentname: 'name1 ', studentlastname: 'last-name ',
            //     studentspecialitycode: 'QYAS123', studentspeciality: 'IS'};
        });
    }

    load(id) {
        this.archBlankService.find(id).subscribe((request) => {
            this.request = request;

            this.archAttachmentService.find(request.id, 6).subscribe(
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
