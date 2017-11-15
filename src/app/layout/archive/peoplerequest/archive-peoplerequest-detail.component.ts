import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchPeopleRequest} from '../../../shared/model/arch-people_request';
import {ArchPeopleRequestService} from './archive-people_request.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-archive-peoplerequest-detail',
    templateUrl: './archive-peoplerequest-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchivePeopleRequestDetailComponent implements OnInit, OnDestroy {
    peoplerequest: ArchPeopleRequest;
    private subscription: any;

    constructor(
        private archBlankService: ArchPeopleRequestService,
        private route: ActivatedRoute
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
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
