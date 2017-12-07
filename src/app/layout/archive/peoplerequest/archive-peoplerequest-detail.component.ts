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
