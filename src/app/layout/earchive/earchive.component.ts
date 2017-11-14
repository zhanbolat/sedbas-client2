import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
// import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, JhiLanguageService, AlertService } from 'ng-jhipster';

// import { Blog } from './earchive.model';
import { BlogService } from './earchive.service';
import {ArchBlank} from '../../shared/model/arch-blank';
// import { ITEMS_PER_PAGE, Principal } from '../../shared';
// import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-blog',
    templateUrl: './earchive.component.html'
})
export class BlogComponent implements OnInit, OnDestroy {
blanks: ArchBlank[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private blogService: BlogService,
        private alertService: AlertService,
        private eventManager: EventManager
        // private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['blog']);
    }

    loadAll() {
        this.blogService.query().subscribe(
            (res: Response) => {
                this.blanks = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        // this.principal.identity().then((account) => {
        //     this.currentAccount = account;
        // });
        this.registerChangeInBlogs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ArchBlank) {
        return item.blankid;
    }
    registerChangeInBlogs() {
        this.eventSubscriber = this.eventManager.subscribe('blogListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
