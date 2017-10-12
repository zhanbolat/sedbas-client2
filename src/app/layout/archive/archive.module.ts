import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveRoutingModule } from './archive-routing.module';
import { ArchiveComponent } from './archive.component';

@NgModule({
  imports: [
    CommonModule,
      ArchiveRoutingModule
  ],
  declarations: [ArchiveComponent]
})
export class ArchiveModule { }
