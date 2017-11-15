import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {ArchRequest} from '../../../shared/model/arch-request';
import {ArchRequestService} from './archive-request.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-archive-request-detail',
    templateUrl: './archive-request-detail.component.html',
    styleUrls: ['../archive.component.scss'],
    animations: [routerTransition()]
})
export class ArchiveRequestDetailComponent implements OnInit, OnDestroy {
    request: ArchRequest;
    private subscription: any;

    constructor(
        private archBlankService: ArchRequestService,
        private route: ActivatedRoute
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
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
