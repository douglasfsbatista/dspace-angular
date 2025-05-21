import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrejaHomeComponent } from './creja-home.component';

@NgModule({
  declarations: [CrejaHomeComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CrejaHomeComponent]
})
export class CrejaHomeModule {}