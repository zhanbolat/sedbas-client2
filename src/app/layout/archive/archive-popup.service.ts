import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {ArchBlank} from '../../shared/model/arch-blank';
import {ArchBlankService} from './blank/archive-blank.service';
import {ArchInboxService} from './inbox/archive-inbox.service';
import {ArchOutboxService} from './outbox/archive-outbox.service';
import {ArchInnerboxService} from './innerbox/archive-innerbox.service';
import {ArchPeopleRequestService} from './peoplerequest/archive-people_request.service';
import {ArchRequestService} from './request/archive-request.service';
import {ArchInbox} from '../../shared/model/arch-inbox';
import {ArchOutbox} from '../../shared/model/arch-outbox';
import {ArchInnerbox} from '../../shared/model/arch-innerbox';
import {ArchPeopleRequest} from '../../shared/model/arch-people_request';
import {ArchRequest} from '../../shared/model/arch-request';
@Injectable()
export class ArchivePopupService {
    private isOpen = false;
    doc: any;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private blankService: ArchBlankService,
        private inboxService: ArchInboxService,
        private outboxService: ArchOutboxService,
        private innerboxService: ArchInnerboxService,
        private peopleRequestService: ArchPeopleRequestService,
        private requestService: ArchRequestService
    ) {}

    open(component: Component, type: string, id?: number | any): NgbModalRef {
        console.log('ArchivePopupService id=' + id);
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        switch (type) {
            case 'inbox': {
                if (id) {
                    this.doc = {inboxid: 3, inboxnumber: 11231231, fromwhoom: 'Zzzg ssss', executorfullname: 'ad asd kjas'};
                    this.blogModalRef(component, this.doc, type);

                    // this.inboxService.find(id).subscribe((res) => {
                    //     this.blogModalRef(component, res, type);
                    // });
                } else {
                    return this.blogModalRef(component, new ArchInbox(), type);
                }
                break;
            }
            case 'outbox': {
                if (id) {
                    this.doc = {outboxid: 3, forwhom: 'Test test1', inboxnumber: '1234123', docownerfullname: 'Owner name1'};
                    this.blogModalRef(component, this.doc, type);

                    // this.outboxService.find(id).subscribe((res) => {
                    //     this.blogModalRef(component, res, type);
                    // });
                } else {
                    return this.blogModalRef(component, new ArchOutbox(), type);
                }
                break;
            }
            case 'innerbox': {
                if (id) {
                    this.doc = {innerboxid: 1, innerboxnumber: 12222241, reporterfullname: 'Reporter1', executorfullname: 'qqq ad kjas'};
                    this.blogModalRef(component, this.doc, type);

                    // this.innerboxService.find(id).subscribe((res) => {
                    //     this.blogModalRef(component, res, type);
                    // });
                } else {
                    return this.blogModalRef(component, new ArchInnerbox(), type);
                }
                break;
            }
            case 'blank': {
                if (id) {
                    this.doc = {blankid: id, blanktype: 1, manufacturer: 'manufacturer1_update', exemplarcount: 5};
                    this.blogModalRef(component, this.doc, type);

                    // this.blankService.find(id).subscribe((blank) => {
                    //     this.blogModalRef(component, blank, type);
                    // });
                } else {
                    return this.blogModalRef(component, new ArchBlank(), type);
                }
                break;
            }
            case 'peoplerequest': {
                if (id) {
                    this.doc = {peoplerequestid: 10, documentnumber: '12222222', forwhoom: 'David', executorfullname: 'Name 1',
                        address: 'Address 1, US'};
                    this.blogModalRef(component, this.doc, type);

                    // this.peopleRequestService.find(id).subscribe((res) => {
                    //     this.blogModalRef(component, res, type);
                    // });
                } else {
                    return this.blogModalRef(component, new ArchPeopleRequest(), type);
                }
                break;
            }
            case 'request': {
                if (id) {
                    this.doc = {id: 1, studentid: 1111, studentsurname: 'Smith', studentname: 'name2 ', studentlastname: 'lastName ',
                        studentspecialitycode: 'QYAS123', studentspeciality: 'CSSE'};
                    this.blogModalRef(component, this.doc, type);

                    // this.requestService.find(id).subscribe((res) => {
                    //     this.blogModalRef(component, res, type);
                    // });
                } else {
                    return this.blogModalRef(component, new ArchRequest(), type);
                }
                break;
            }
        }
    }

    blogModalRef(component: Component, doc: any, type: string): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.docType = type;
        switch (type) {
            case 'inbox': {
                modalRef.componentInstance.inbox = doc as ArchInbox;
                break;
            }
            case 'outbox': {
                modalRef.componentInstance.outbox = doc as ArchOutbox;
                break;
            }
            case 'innerbox': {
                modalRef.componentInstance.innerbox = doc as ArchInnerbox;
                break;
            }
            case 'blank': {
                modalRef.componentInstance.blank = doc as ArchBlank;
                break;
            }
            case 'peoplerequest': {
                modalRef.componentInstance.peoplerequest = doc as ArchPeopleRequest;
                break;
            }
            case 'request': {
                modalRef.componentInstance.request = doc as ArchRequest;
                break;
            }
        }

        modalRef.result.then((result) => {
            console.log('modalRef in result1: ' + result);
            this.router.navigate(['/archive'], { replaceUrl: true });
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            console.log('modalRef in result2: ' + reason);
            this.router.navigate(['/archive'], { replaceUrl: true });
            // this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
