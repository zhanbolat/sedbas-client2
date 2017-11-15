import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchiveComponent } from './archive.component';
import {ArchiveDetailComponent} from './blank/archive-blank-detail.component';
import {ArchiveBlankPopupComponent} from './blank/archive-blank-dialog.component';
import {ArchiveBlankDeletePopupComponent} from './blank/archive-blank-delete-dialog.component';
import {ArchiveInboxPopupComponent} from './inbox/archive-inbox-dialog.component';
import {ArchiveInboxDeletePopupComponent} from './inbox/archive-inbox-delete-dialog.component';
import {ArchiveInboxDetailComponent} from './inbox/archive-inbox-detail.component';
import {ArchiveInnerboxPopupComponent} from './innerbox/archive-innerbox-dialog.component';
import {ArchiveInnerboxDeletePopupComponent} from './innerbox/archive-innerbox-delete-dialog.component';
import {ArchiveInnerboxDetailComponent} from './innerbox/archive-innerbox-detail.component';
import {ArchiveOutboxPopupComponent} from './outbox/archive-outbox-dialog.component';
import {ArchiveOutboxDeletePopupComponent} from './outbox/archive-outbox-delete-dialog.component';
import {ArchiveOutboxDetailComponent} from './outbox/archive-outbox-detail.component';
import {ArchivePeopleRequestPopupComponent} from './peoplerequest/archive-peoplerequest-dialog.component';
import {ArchivePeopleRequestDeletePopupComponent} from './peoplerequest/archive-peoplerequest-delete-dialog.component';
import {ArchivePeopleRequestDetailComponent} from './peoplerequest/archive-peoplerequest-detail.component';
import {ArchiveRequestPopupComponent} from './request/archive-request-dialog.component';
import {ArchiveRequestDeletePopupComponent} from './request/archive-request-delete-dialog.component';
import {ArchiveRequestDetailComponent} from './request/archive-request-detail.component';

export const routes: Routes = [
    { path: '', component: ArchiveComponent},
    { path: 'blank-new', component: ArchiveBlankPopupComponent, outlet: 'popup', data: {docType: 'blank'} },
    { path: 'blank/:id/edit', component: ArchiveBlankPopupComponent, outlet: 'popup', data: {docType: 'blank'} },
    { path: 'blank/:id/delete', component: ArchiveBlankDeletePopupComponent, outlet: 'popup', data: {docType: 'blank'} },
    { path: 'blank/:id', component: ArchiveDetailComponent },
    { path: 'inbox-new', component: ArchiveInboxPopupComponent, outlet: 'popup', data: {docType: 'inbox'} },
    { path: 'inbox/:id/edit', component: ArchiveInboxPopupComponent, outlet: 'popup', data: {docType: 'inbox'} },
    { path: 'inbox/:id/delete', component: ArchiveInboxDeletePopupComponent, outlet: 'popup', data: {docType: 'inbox'} },
    { path: 'inbox/:id', component: ArchiveInboxDetailComponent },
    { path: 'innerbox-new', component: ArchiveInnerboxPopupComponent, outlet: 'popup', data: {docType: 'innerbox'} },
    { path: 'innerbox/:id/edit', component: ArchiveInnerboxPopupComponent, outlet: 'popup', data: {docType: 'innerbox'} },
    { path: 'innerbox/:id/delete', component: ArchiveInnerboxDeletePopupComponent, outlet: 'popup', data: {docType: 'innerbox'} },
    { path: 'innerbox/:id', component: ArchiveInnerboxDetailComponent },
    { path: 'outbox-new', component: ArchiveOutboxPopupComponent, outlet: 'popup', data: {docType: 'outbox'} },
    { path: 'outbox/:id/edit', component: ArchiveOutboxPopupComponent, outlet: 'popup', data: {docType: 'outbox'} },
    { path: 'outbox/:id/delete', component: ArchiveOutboxDeletePopupComponent, outlet: 'popup', data: {docType: 'outbox'} },
    { path: 'outbox/:id', component: ArchiveOutboxDetailComponent },
    { path: 'peoplerequest-new', component: ArchivePeopleRequestPopupComponent, outlet: 'popup', data: {docType: 'peoplerequest'} },
    { path: 'peoplerequest/:id/edit', component: ArchivePeopleRequestPopupComponent, outlet: 'popup', data: {docType: 'peoplerequest'} },
    { path: 'peoplerequest/:id/delete', component: ArchivePeopleRequestDeletePopupComponent, outlet: 'popup', data: {docType: 'peoplerequest'} },
    { path: 'peoplerequest/:id', component: ArchivePeopleRequestDetailComponent },
    { path: 'request-new', component: ArchiveRequestPopupComponent, outlet: 'popup', data: {docType: 'request'} },
    { path: 'request/:id/edit', component: ArchiveRequestPopupComponent, outlet: 'popup', data: {docType: 'request'} },
    { path: 'request/:id/delete', component: ArchiveRequestDeletePopupComponent, outlet: 'popup', data: {docType: 'request'} },
    { path: 'request/:id', component: ArchiveRequestDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArchiveRoutingModule { }
