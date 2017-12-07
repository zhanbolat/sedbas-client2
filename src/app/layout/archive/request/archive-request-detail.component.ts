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
