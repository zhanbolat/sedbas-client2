import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchiveComponent } from './archive.component';
import {ArchiveDetailComponent} from './blank/archive-blank-detail.component';
import {ArchiveBlankPopupComponent} from './blank/archive-blank-dialog.component';
import {ArchiveBlankDeletePopupComponent} from './blank/archive-blank-delete-dialog.component';
import {ArchiveInboxPopupComponent} from './inbox/archive-inbox-dialog.component';
import {ArchiveInboxDeletePopupComponent} from './inbox/archive-inbox-delete-dialog.component';
import {ArchiveInboxDetailComponent} from './inbox/archive-inbox-detail.component';

export const routes: Routes = [
    { path: '', component: ArchiveComponent},
    { path: 'blank-new', component: ArchiveBlankPopupComponent, outlet: 'popup', data: {docType: 'blank'} },
    { path: 'blank/:id/edit', component: ArchiveBlankPopupComponent, outlet: 'popup', data: {docType: 'blank'} },
    { path: 'blank/:id/delete', component: ArchiveBlankDeletePopupComponent, outlet: 'popup', data: {docType: 'blank'} },
    { path: 'blank/:id', component: ArchiveDetailComponent },
    { path: 'inbox-new', component: ArchiveInboxPopupComponent, outlet: 'popup', data: {docType: 'inbox'} },
    { path: 'inbox/:id/edit', component: ArchiveInboxPopupComponent, outlet: 'popup', data: {docType: 'inbox'} },
    { path: 'inbox/:id/delete', component: ArchiveInboxDeletePopupComponent, outlet: 'popup', data: {docType: 'inbox'} },
    { path: 'inbox/:id', component: ArchiveInboxDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArchiveRoutingModule { }
