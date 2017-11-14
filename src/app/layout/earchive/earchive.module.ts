import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import { BlogSharedModule } from '../../shared';
// import { BlogAdminModule } from '../../admin/admin.module';
import {
    BlogService,
    // BlogPopupService,
    BlogComponent,
    // BlogDetailComponent,
    // BlogDialogComponent,
    // BlogPopupComponent,
    // BlogDeletePopupComponent,
    // BlogDeleteDialogComponent,
    // blogRoute,
    // blogPopupRoute,
} from './';
import {EArchiveRoutingModule} from './earchive.route';


// const ENTITY_STATES = [
//     ...blogRoute,
//     // ...blogPopupRoute,
// ];

@NgModule({
    imports: [
        // BlogSharedModule,
        // BlogAdminModule,
        CommonModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        EArchiveRoutingModule
    ],
    declarations: [
        BlogComponent,
        // BlogDetailComponent,
        // BlogDialogComponent,
        // BlogDeleteDialogComponent,
        // BlogPopupComponent,
        // BlogDeletePopupComponent,
    ],
    entryComponents: [
        BlogComponent,
        // BlogDialogComponent,
        // BlogPopupComponent,
        // BlogDeleteDialogComponent,
        // BlogDeletePopupComponent,
    ],
    providers: [
        BlogService,
        // BlogPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogBlogModule {}
