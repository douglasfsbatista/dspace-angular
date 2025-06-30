import {
  CommonModule,
  AsyncPipe,
  NgIf,
  NgForOf,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CollectionPageComponent as BaseComponent } from '../../../../app/collection-page/collection-page.component';
import {
  fadeIn,
  fadeInOut,
} from '../../../../app/shared/animations/fade';
import { ThemedComcolPageBrowseByComponent } from '../../../../app/shared/comcol/comcol-page-browse-by/themed-comcol-page-browse-by.component';
import { ThemedComcolPageContentComponent } from '../../../../app/shared/comcol/comcol-page-content/themed-comcol-page-content.component';
import { ThemedComcolPageHandleComponent } from '../../../../app/shared/comcol/comcol-page-handle/themed-comcol-page-handle.component';
import { ComcolPageHeaderComponent } from '../../../../app/shared/comcol/comcol-page-header/comcol-page-header.component';
import { ComcolPageLogoComponent } from '../../../../app/shared/comcol/comcol-page-logo/comcol-page-logo.component';
import { DsoEditMenuComponent } from '../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { ErrorComponent } from '../../../../app/shared/error/error.component';
import { ThemedLoadingComponent } from '../../../../app/shared/loading/themed-loading.component';
import { ObjectCollectionComponent } from '../../../../app/shared/object-collection/object-collection.component';
import { VarDirective } from '../../../../app/shared/utils/var.directive';
import { ViewTrackerComponent } from '../../../../app/statistics/angulartics/dspace/view-tracker.component';

@Component({
  selector: 'ds-themed-collection-page',
  templateUrl: '../../../../app/collection-page/collection-page.component.html',
  styleUrls: ['../../../../app/collection-page/collection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeIn,
    fadeInOut,
  ],
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    FormsModule,
    RouterModule,
    RouterOutlet,
    TranslateModule,
    ThemedComcolPageContentComponent,
    ErrorComponent,
    ThemedLoadingComponent,
    ViewTrackerComponent,
    VarDirective,
    ComcolPageHeaderComponent,
    ComcolPageLogoComponent,
    ThemedComcolPageHandleComponent,
    DsoEditMenuComponent,
    ThemedComcolPageBrowseByComponent,
    ObjectCollectionComponent,
  ],
})
/**
 * This component represents a detail page for a single collection
 */
export class CollectionPageComponent extends BaseComponent {
}