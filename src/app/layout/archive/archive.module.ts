import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import {ArchiveRoutingModule} from './archive-routing.module';
import { ArchiveComponent } from './archive.component';
import {ArchiveDetailComponent} from './blank/archive-blank-detail.component';
import {JhiAlertErrorComponent} from '../../shared/alert/alert-error.component';
import {JhiAlertComponent} from '../../shared/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AlertService, JhiLanguageService} from 'ng-jhipster';
import {ArchBlankService} from './blank/archive-blank.service';
import {ArchivePopupService} from './archive-popup.service';
import {FormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core'

import {ArchInboxService} from './inbox/archive-inbox.service';
import {ArchInnerboxService} from './innerbox/archive-innerbox.service';
import {ArchOutboxService} from './outbox/archive-outbox.service';
import {ArchRequestService} from './request/archive-request.service';
import {ArchPeopleRequestService} from './peoplerequest/archive-people_request.service';
import {ArchiveBlankDialogComponent, ArchiveBlankPopupComponent} from './blank/archive-blank-dialog.component';
import {
    ArchiveBlankDeleteDialogComponent,
    ArchiveBlankDeletePopupComponent
} from './blank/archive-blank-delete-dialog.component';
import {ArchiveInboxDialogComponent, ArchiveInboxPopupComponent} from './inbox/archive-inbox-dialog.component';
import {
    ArchiveInboxDeleteDialogComponent,
    ArchiveInboxDeletePopupComponent
} from './inbox/archive-inbox-delete-dialog.component';
import {ArchiveInboxDetailComponent} from './inbox/archive-inbox-detail.component';
import {
    ArchiveInnerboxDialogComponent,
    ArchiveInnerboxPopupComponent
} from './innerbox/archive-innerbox-dialog.component';
import {
    ArchiveInnerboxDeleteDialogComponent,
    ArchiveInnerboxDeletePopupComponent
} from './innerbox/archive-innerbox-delete-dialog.component';
import {ArchiveInnerboxDetailComponent} from './innerbox/archive-innerbox-detail.component';
import {ArchiveOutboxDetailComponent} from './outbox/archive-outbox-detail.component';
import {ArchiveOutboxDialogComponent, ArchiveOutboxPopupComponent} from './outbox/archive-outbox-dialog.component';
import {
    ArchiveOutboxDeleteDialogComponent,
    ArchiveOutboxDeletePopupComponent
} from './outbox/archive-outbox-delete-dialog.component';
import {ArchivePeopleRequestDetailComponent} from './peoplerequest/archive-peoplerequest-detail.component';
import {
    ArchivePeopleRequestDialogComponent,
    ArchivePeopleRequestPopupComponent
} from './peoplerequest/archive-peoplerequest-dialog.component';
import {
    ArchivePeopleRequestDeleteDialogComponent,
    ArchivePeopleRequestDeletePopupComponent
} from './peoplerequest/archive-peoplerequest-delete-dialog.component';
import {ArchiveRequestDetailComponent} from './request/archive-request-detail.component';
import {ArchiveRequestDialogComponent, ArchiveRequestPopupComponent} from './request/archive-request-dialog.component';
import {
    ArchiveRequestDeleteDialogComponent,
    ArchiveRequestDeletePopupComponent
} from './request/archive-request-delete-dialog.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {FilterPipe} from '../../shared/pipes/filter.pipe';
import {ArchAttachmentService} from "./attachment/archive-attachment.service";


// export function alertServiceProvider(sanitizer: Sanitizer, translateService: TranslateService) {
//     // set below to true to make alerts look like toast
//     const isToast = false;
//     return new AlertService(sanitizer, isToast);
// }
//
// export function HttpLoaderFactory(http: HttpClient) {
//     // for development
//     // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
//     return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
// }
//
// const ENTITY_STATES = [
//     ...routes,
//     ...blogPopupRoute,
// ];


@NgModule({
  imports: [
    CommonModule,
      NgbModule,
      FormsModule,
      ArchiveRoutingModule,
      NgbModule.forRoot(),
      NgxPaginationModule,
      Ng2OrderModule
      // TranslateModule.forRoot({
      //     loader: {
      //         provide: TranslateLoader,
      //         useFactory: HttpLoaderFactory,
      //         deps: [HttpClient]
      //     }
      // })
      // RouterModule.forChild(ENTITY_STATES)
  ],
    // providers: [
    //     AlertService,
    //     {
    //         provide: AlertService,
    //         useFactory: alertServiceProvider,
    //         deps: [Sanitizer, TranslateService]
    //     },
    //     Title
    // ],
    providers: [
        ArchAttachmentService,
        ArchBlankService,
        ArchInboxService,
        ArchInnerboxService,
        ArchOutboxService,
        ArchRequestService,
        ArchPeopleRequestService,
        ArchivePopupService,
        JhiLanguageService,
        TranslateService,
        //     {
        //         provide: AlertService,
        //         useFactory: alertServiceProvider,
        //         deps: [Sanitizer, TranslateService]
        //     },
        // {
        //     provide: TranslateLoader,
        //     useFactory: HttpLoaderFactory,
        //     deps: [HttpClient]
        // },
            Title
    ],
    entryComponents: [
        ArchiveComponent,
        ArchiveBlankDialogComponent,
        ArchiveBlankPopupComponent,
        ArchiveBlankDeleteDialogComponent,
        ArchiveBlankDeletePopupComponent,
        ArchiveInboxDialogComponent,
        ArchiveInboxPopupComponent,
        ArchiveInboxDeleteDialogComponent,
        ArchiveInboxDeletePopupComponent,
        ArchiveInnerboxDialogComponent,
        ArchiveInnerboxPopupComponent,
        ArchiveInnerboxDeleteDialogComponent,
        ArchiveInnerboxDeletePopupComponent,
        ArchiveOutboxDialogComponent,
        ArchiveOutboxPopupComponent,
        ArchiveOutboxDeleteDialogComponent,
        ArchiveOutboxDeletePopupComponent,
        ArchivePeopleRequestDialogComponent,
        ArchivePeopleRequestPopupComponent,
        ArchivePeopleRequestDeleteDialogComponent,
        ArchivePeopleRequestDeletePopupComponent,
        ArchiveRequestDialogComponent,
        ArchiveRequestPopupComponent,
        ArchiveRequestDeleteDialogComponent,
        ArchiveRequestDeletePopupComponent,
    ],
  declarations: [ArchiveComponent,
      ArchiveDetailComponent,
      ArchiveBlankDialogComponent,
      ArchiveBlankPopupComponent,
      ArchiveBlankDeleteDialogComponent,
      ArchiveBlankDeletePopupComponent,
      ArchiveInboxDetailComponent,
      ArchiveInboxDialogComponent,
      ArchiveInboxPopupComponent,
      ArchiveInboxDeleteDialogComponent,
      ArchiveInboxDeletePopupComponent,
      ArchiveInnerboxDetailComponent,
      ArchiveInnerboxDialogComponent,
      ArchiveInnerboxPopupComponent,
      ArchiveInnerboxDeleteDialogComponent,
      ArchiveInnerboxDeletePopupComponent,
      ArchiveOutboxDetailComponent,
      ArchiveOutboxDialogComponent,
      ArchiveOutboxPopupComponent,
      ArchiveOutboxDeleteDialogComponent,
      ArchiveOutboxDeletePopupComponent,
      ArchivePeopleRequestDetailComponent,
      ArchivePeopleRequestDialogComponent,
      ArchivePeopleRequestPopupComponent,
      ArchivePeopleRequestDeleteDialogComponent,
      ArchivePeopleRequestDeletePopupComponent,
      ArchiveRequestDetailComponent,
      ArchiveRequestDialogComponent,
      ArchiveRequestPopupComponent,
      ArchiveRequestDeleteDialogComponent,
      ArchiveRequestDeletePopupComponent,
      FilterPipe,
      JhiAlertComponent,
      JhiAlertErrorComponent
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArchiveModule { }
