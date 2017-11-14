import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchiveComponent } from './archive.component';
import {ArchiveDetailComponent} from './blank/archive-blank-detail.component';
import {ArchiveBlankPopupComponent} from './blank/archive-blank-dialog.component';
import {ArchiveBlankDeletePopupComponent} from './blank/archive-blank-delete-dialog.component';

export const routes: Routes = [
    { path: '', component: ArchiveComponent},
    { path: 'blank-new', component: ArchiveBlankPopupComponent, outlet: 'popup', data: {docType: 'blank'} },
    { path: 'blank/:id/edit', component: ArchiveBlankPopupComponent, outlet: 'popup', data: {docType: 'blank'} },
    { path: 'blank/:id/delete', component: ArchiveBlankDeletePopupComponent, outlet: 'popup', data: {docType: 'blank'} },
    { path: 'blank/:id', component: ArchiveDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArchiveRoutingModule { }
