import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  filter,
  map,
  mergeMap,
} from 'rxjs/operators';

import { CollectionPageComponent as BaseComponent } from '../../../../app/collection-page/collection-page.component';
import {
  fadeIn,
  fadeInOut,
} from '../../../../app/shared/animations/fade';
import { ThemedComcolPageBrowseByComponent } from '../../../../app/shared/comcol/comcol-page-browse-by/themed-comcol-page-browse-by.component';
import { ThemedComcolPageContentComponent } from '../../../../app/shared/comcol/comcol-page-content/themed-comcol-page-content.component';
import { ThemedComcolPageHandleComponent } from '../../../../app/shared/comcol/comcol-page-handle/themed-comcol-page-handle.component';
import { ComcolPageHeaderComponent } from '../../../../app/shared/comcol/comcol-page-header/comcol-page-header.component';
import { ComcolPageLogoComponent } from '../shared/comcol/comcol-page-logo/comcol-page-logo.component';
import { DsoEditMenuComponent } from '../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { ErrorComponent } from '../../../../app/shared/error/error.component';
import { ThemedLoadingComponent } from '../../../../app/shared/loading/themed-loading.component';
import { ObjectCollectionComponent } from '../../../../app/shared/object-collection/object-collection.component';
import { VarDirective } from '../../../../app/shared/utils/var.directive';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DSONameService } from '../../../../app/core/breadcrumbs/dso-name.service';
import { CollectionDataService } from '../../../../app/core/data/collection-data.service';
import { AuthorizationDataService } from '../../../../app/core/data/feature-authorization/authorization-data.service';
import { redirectOn4xx } from '../../../../app/core/shared/authorized.operators';
import { RemoteData } from '../../../../app/core/data/remote-data';
import { Collection } from '../../../../app/core/shared/collection.model';
import { hasValue } from '../../../../app/shared/empty.util';
import { FeatureID } from '../../../../app/core/data/feature-authorization/feature-id';
import { getAllSucceededRemoteDataPayload } from '../../../../app/core/shared/operators';
import { getCollectionPageRoute } from '../../../../app/collection-page/collection-page-routing-paths';

@Component({
  selector: 'ds-themed-collection-page',
  templateUrl: './collection-page.component.html',
  // templateUrl: '../../../../app/collection-page/collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
  // styleUrls: ['../../../../app/collection-page/collection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeIn,
    fadeInOut,
  ],
  standalone: true,
  imports: [
    ThemedComcolPageContentComponent,
    ErrorComponent,
    NgIf,
    ThemedLoadingComponent,
    TranslateModule,
    VarDirective,
    AsyncPipe,
    ComcolPageHeaderComponent,
    ComcolPageLogoComponent,
    ThemedComcolPageHandleComponent,
    DsoEditMenuComponent,
    ThemedComcolPageBrowseByComponent,
    ObjectCollectionComponent,
    RouterOutlet,
  ],
})
/**
 * This component represents a detail page for a single collection
 */
export class CollectionPageComponent extends BaseComponent {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected authService: AuthService,
    protected authorizationDataService: AuthorizationDataService,
    public dsoNameService: DSONameService,
    protected collectionDataService: CollectionDataService,
  ) {
    super(route, router, authService, authorizationDataService, dsoNameService);
  }

  override ngOnInit(): void {
    this.collectionRD$ = this.route.data.pipe(
      map((data) => data.dso as RemoteData<Collection>),
      redirectOn4xx(this.router, this.authService),
    );
    this.logoRD$ = this.collectionRD$.pipe(
      map((rd: RemoteData<Collection>) => rd.payload),
      filter((collection: Collection) => hasValue(collection)),
      mergeMap((collection: Collection) => collection.logo),
    );
    this.isCollectionAdmin$ = this.authorizationDataService.isAuthorized(FeatureID.IsCollectionAdmin);

    this.collectionPageRoute$ = this.collectionRD$.pipe(
      getAllSucceededRemoteDataPayload(),
      map((collection) => getCollectionPageRoute(collection.id)),
    );
  }
}
