import {Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import {ArchBlank} from '../../shared/model/arch-blank';
import {ArchBlankService} from './blank/archive-blank.service';
import {Response} from '@angular/http';
import {ArchInboxService} from './inbox/archive-inbox.service';
import {ArchInnerboxService} from './innerbox/archive-innerbox.service';
import {ArchOutboxService} from './outbox/archive-outbox.service';
import {ArchRequestService} from './request/archive-request.service';
import {ArchPeopleRequestService} from './peoplerequest/archive-people_request.service';
import {ArchInbox} from '../../shared/model/arch-inbox';
import {ArchInnerbox} from '../../shared/model/arch-innerbox';
import {ArchOutbox} from '../../shared/model/arch-outbox';
import {ArchRequest} from '../../shared/model/arch-request';
import {ArchPeopleRequest} from '../../shared/model/arch-people_request';

@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    styleUrls: ['./archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveComponent implements OnInit {
    blanks: ArchBlank[];
    inboxes: ArchInbox[];
    innerboxes: ArchInnerbox[];
    outboxes: ArchOutbox[];
    requests: ArchRequest[];
    peoplerequests: ArchPeopleRequest[];
    activeIdString: string;
    constructor(
        private archBlankService: ArchBlankService,
        private archInboxService: ArchInboxService,
        private archInnerboxService: ArchInnerboxService,
        private archOutboxService: ArchOutboxService,
        private archRequestService: ArchRequestService,
        private archPeopleRequestService: ArchPeopleRequestService
    ) {
    }

    loadTab() {
        switch (this.activeIdString) {
            case 'inboxTab': {
                this.archInboxService.query().subscribe(
                    (res: Response) => {
                        this.inboxes = res.json();
                    },
                    (res: Response) => this.onError(res.json())
                );
                break;
            }
            case 'outboxTab': {
                this.archOutboxService.query().subscribe(
                    (res: Response) => {
                        this.outboxes = res.json();
                    },
                    (res: Response) => this.onError(res.json())
                );
                break;
            }
            case 'innerTab': {
                this.archInnerboxService.query().subscribe(
                    (res: Response) => {
                        this.innerboxes = res.json();
                    },
                    (res: Response) => this.onError(res.json())
                );
                break;
            }
            case 'blankTab': {
                this.archBlankService.query().subscribe(
                    (res: Response) => {
                        this.blanks = res.json();
                    },
                    (res: Response) => this.onError(res.json())
                );
                break;
            }
            case 'requestTab': {
                this.archPeopleRequestService.query().subscribe(
                    (res: Response) => {
                        this.peoplerequests = res.json();
                    },
                    (res: Response) => this.onError(res.json())
                );
                break;
            }
            case 'sRequestTab': {
                this.archRequestService.query().subscribe(
                    (res: Response) => {
                        this.requests = res.json();
                    },
                    (res: Response) => this.onError(res.json())
                );
                break;
            }
            default: {
                this.activeIdString = 'inboxTab';
                this.archInboxService.query().subscribe(
                    (res: Response) => {
                        this.inboxes = res.json();
                    },
                    (res: Response) => this.onError(res.json())
                );
                break;
            }
        }
    }

    loadAll() {
        this.archInboxService.query().subscribe(
            (res: Response) => {
                this.inboxes = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
        this.archOutboxService.query().subscribe(
            (res: Response) => {
                this.outboxes = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
        this.archInnerboxService.query().subscribe(
            (res: Response) => {
                this.innerboxes = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
        this.archBlankService.query().subscribe(
            (res: Response) => {
                this.blanks = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
        this.archPeopleRequestService.query().subscribe(
            (res: Response) => {
                this.peoplerequests = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
        this.archRequestService.query().subscribe(
            (res: Response) => {
                this.requests = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }

    loadTab1() {
        switch (this.activeIdString) {
            case 'inboxTab': {
                this.inboxes = [
                    {inboxid: 3, inboxnumber: 11231231, fromwhoom: 'Zzzg ssss', executorfullname: 'ad asd kjas'},
                    {inboxid: 4, inboxnumber: 212341, fromwhoom: 'Aaasds kllk', executorfullname: 'z fajs adsds'}
                ];
                break;
            }
            case 'outboxTab': {
                this.outboxes = [
                    {outboxid: 3, forwhom: 'Test test1', inboxnumber: '1234123', docownerfullname: 'Owner name1'},
                    {outboxid: 6, forwhom: 'Test test2', inboxnumber: '534312', docownerfullname: 'Owner 2'}
                ];
                break;
            }
            case 'innerTab': {
                this.innerboxes = [
                    {innerboxid: 1, innerboxnumber: 12222241, reporterfullname: 'Reporter1', executorfullname: 'qqq ad kjas'},
                    {innerboxid: 2, innerboxnumber: 111111, reporterfullname: 'Reporter name2', executorfullname: 'zzz fajs adsds'}
                ];
                break;
            }
            case 'blankTab': {
                this.blanks = [
                    {blankid: 1, blanktype: 1, manufacturer: 'manufacturer1', exemplarcount: 5},
                    {blankid: 2, blanktype: 1, manufacturer: 'manufacturer2', exemplarcount: 3}
                ];
                break;
            }
            case 'requestTab': {
                this.peoplerequests = [
                    {peoplerequestid: 10, documentnumber: '12222222', forwhoom: 'David', executorfullname: 'Name 1',
                        address: 'Address 1, US'},
                    {peoplerequestid: 21, documentnumber: '11111111', forwhoom: 'John', executorfullname: 'Executor 2',
                        address: 'Almaty, Kz'}
                ];
                break;
            }
            case 'sRequestTab': {
                this.requests = [
                    {id: 2, studentid: 2222, studentsurname: 'surname1 ', studentname: 'name1 ', studentlastname: 'last-name ',
                        studentspecialitycode: 'QYAS123', studentspeciality: 'IS'},
                    {id: 1, studentid: 1111, studentsurname: 'Smith', studentname: 'name2 ', studentlastname: 'lastName ',
                        studentspecialitycode: 'QYAS123', studentspeciality: 'CSSE'}
                ];
                break;
            }
            default: {
                this.activeIdString = 'inboxTab';
                this.inboxes = [
                    {inboxid: 1, inboxnumber: 11231231, fromwhoom: 'Zzzg ssss', executorfullname: 'ad asd kjas'},
                    {inboxid: 2, inboxnumber: 212341, fromwhoom: 'Aaasds kllk', executorfullname: 'z fajs adsds'}
                ];
                break;
            }
        }
    }

    loadAll1() {
        this.inboxes = [
            {inboxid: 2, inboxnumber: 212341, fromwhoom: 'Aaasds kllk', executorfullname: 'z fajs adsds'}
        ];
        this.outboxes = [
            {outboxid: 6, forwhom: 'Test test2', inboxnumber: '534312', docownerfullname: 'Owner 2'}
        ];
        this.innerboxes = [
            {innerboxid: 2, innerboxnumber: 111111, reporterfullname: 'Reporter name2', executorfullname: 'zzz fajs adsds'}
        ];
        this.blanks = [
            {blankid: 2, blanktype: 1, manufacturer: 'manufacturer2', exemplarcount: 3}
        ];
        this.peoplerequests = [
            {peoplerequestid: 21, documentnumber: '11111111', forwhoom: 'John', executorfullname: 'Executor 2', address: 'Almaty, Kz'}
        ];
        this.requests = [
            {id: 1, studentid: 1111, studentsurname: 'Smith', studentname: 'name2 ', studentlastname: 'lastName ',
                studentspecialitycode: 'QYAS123', studentspeciality: 'CSSE'}
        ];
    }

    ngOnInit() {
        this.activeIdString = 'inboxTab';
        // this.loadTab();
        // this.loadAll();
        this.loadTab1();
        this.loadAll1();
        // this.principal.identity().then((account) => {
        //     this.currentAccount = account;
        // });
        // this.registerChangeInBlogs();
    }

    changeTab(id: string) {
        console.log('change tab method called with tab id: ' + id);
        this.activeIdString = id;
        this.loadTab1();
        // this.loadTab();
    }

    trackId(index: number, item: ArchBlank) {
        return item.blankid;
    }

    trackInboxId(index: number, item: ArchInbox) {
        return item.inboxid;
    }

    trackInnerboxId(index: number, item: ArchInnerbox) {
        return item.innerboxid;
    }

    trackOutboxId(index: number, item: ArchOutbox) {
        return item.outboxid;
    }

    trackRequestId(index: number, item: ArchRequest) {
        return item.id;
    }

    trackPeopleRequestId(index: number, item: ArchPeopleRequest) {
        return item.peoplerequestid;
    }

    private onError(error) {
        // this.alertService.error(error.message, null, null);
        console.log('Error while getting archive: ' + error.message);
    }
}
