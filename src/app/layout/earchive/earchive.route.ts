import {Injectable, NgModule} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate, RouterModule} from '@angular/router';

// import { UserRouteAccessService } from '../../shared';
// import { PaginationUtil } from 'ng-jhipster';

import { BlogComponent } from './earchive.component';
// import { BlogDetailComponent } from './earchive-detail.component';
// import { BlogPopupComponent } from './earchive-dialog.component';
// import { BlogDeletePopupComponent } from './earchive-delete-dialog.component';
import {AuthGuard} from '../../shared/guard/auth.guard';

// import { Principal } from '../../shared';



export const blogRoute: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.blog.home.title'
    },
    canActivate: [AuthGuard]
  // }, {
  //   path: 'blog/:id',
  //   component: BlogDetailComponent,
  //   data: {
  //       authorities: ['ROLE_USER'],
  //       pageTitle: 'blogApp.blog.home.title'
  //   },
  //   canActivate: [AuthGuard]
  }
];

// export const blogPopupRoute: Routes = [
//   {
//     path: 'blog-new',
//     component: BlogPopupComponent,
//     data: {
//         authorities: ['ROLE_USER'],
//         pageTitle: 'blogApp.blog.home.title'
//     },
//     canActivate: [AuthGuard],
//     outlet: 'popup'
//   },
//   {
//     path: 'blog/:id/edit',
//     component: BlogPopupComponent,
//     data: {
//         authorities: ['ROLE_USER'],
//         pageTitle: 'blogApp.blog.home.title'
//     },
//     canActivate: [AuthGuard],
//     outlet: 'popup'
//   },
//   {
//     path: 'blog/:id/delete',
//     component: BlogDeletePopupComponent,
//     data: {
//         authorities: ['ROLE_USER'],
//         pageTitle: 'blogApp.blog.home.title'
//     },
//     canActivate: [AuthGuard],
//     outlet: 'popup'
//   }
// ];

@NgModule({
    imports: [RouterModule.forChild(blogRoute)],
    exports: [RouterModule]
})
export class EArchiveRoutingModule { }
