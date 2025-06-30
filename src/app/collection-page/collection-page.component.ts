import {
  AsyncPipe,
  CommonModule,
  NgIf,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';

import { AuthService } from '../core/auth/auth.service';
import { DSONameService } from '../core/breadcrumbs/dso-name.service';
import { SortOptions } from '../core/cache/models/sort-options.model';
import { AuthorizationDataService } from '../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../core/data/feature-authorization/feature-id';
import { RemoteData } from '../core/data/remote-data';
import { redirectOn4xx } from '../core/shared/authorized.operators';
import { Bitstream } from '../core/shared/bitstream.model';
import { Collection } from '../core/shared/collection.model';
import { getAllSucceededRemoteDataPayload } from '../core/shared/operators';
import {
  fadeIn,
  fadeInOut,
} from '../shared/animations/fade';
import { ThemedComcolPageBrowseByComponent } from '../shared/comcol/comcol-page-browse-by/themed-comcol-page-browse-by.component';
import { ThemedComcolPageContentComponent } from '../shared/comcol/comcol-page-content/themed-comcol-page-content.component';
import { ThemedComcolPageHandleComponent } from '../shared/comcol/comcol-page-handle/themed-comcol-page-handle.component';
import { ComcolPageHeaderComponent } from '../shared/comcol/comcol-page-header/comcol-page-header.component';
import { ComcolPageLogoComponent } from '../shared/comcol/comcol-page-logo/comcol-page-logo.component';
import { DsoEditMenuComponent } from '../shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import {
  hasValue,
  isNotEmpty,
} from '../shared/empty.util';
import { ErrorComponent } from '../shared/error/error.component';
import { ThemedLoadingComponent } from '../shared/loading/themed-loading.component';
import { ObjectCollectionComponent } from '../shared/object-collection/object-collection.component';
import { PaginationComponentOptions } from '../shared/pagination/pagination-component-options.model';
import { VarDirective } from '../shared/utils/var.directive';
import { ViewTrackerComponent } from '../statistics/angulartics/dspace/view-tracker.component';
import { getCollectionPageRoute } from './collection-page-routing-paths';
import { CollectionDataService } from '../core/data/collection-data.service';

@Component({
  selector: 'ds-base-collection-page',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    AsyncPipe,
    FormsModule,              // <-- para ngModel
    RouterModule,             // <-- para routerLink / routerLinkActive
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
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeInOut],
})
export class CollectionPageComponent implements OnInit {
  // Dados da coleção (resolvidos pelo resolver ou pelo service)
  collectionRD$: Observable<RemoteData<Collection>>;
  logoRD$: Observable<RemoteData<Bitstream>>;
  isCollectionAdmin$: Observable<boolean>;
  collectionPageRoute$: Observable<string>;

  private sub!: Subscription;

  // === NOVIDADES PARA A PÁGINA “Pesquisas e Memórias” ===
  searchTerm = '';
  temas: string[] = [
    'Diversidade', 'Educação antirracista', 'Comunidades quilombolas',
    'Ciganas', 'Indígenas', 'EJA e novas tecnologias', 'EJA e deficiencia',
    'EJA e crise climatica', 'Educação em Direitos Humanos',
    'Educação popular', 'Educação de jovens e adultos', 'Congressos',
    'Conferências'
  ];
  regioes: string[] = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
  municipios: string[] = ['Lorem Ipsum 1','Lorem Ipsum 2','Lorem Ipsum 3','Lorem Ipsum 4'];

  selectedTemas: Record<string,boolean> = {};
  selectedRegioes: Record<string,boolean> = {};
  selectedMunicipios: Record<string,boolean> = {};

  items: any[] = [];          // deverá vir do payload ou de um serviço
  filteredItems: any[] = [];  // items filtrados por search/filtros

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected authService: AuthService,
    protected authorizationDataService: AuthorizationDataService,
    protected dsoNameService: DSONameService,
    protected collectionDataService: CollectionDataService,
  ) {}

  ngOnInit(): void {
    // Carrega a coleção toda vez que :id mudar
    this.collectionRD$ = this.route.paramMap.pipe(
      map(params => params.get('id')!),
      switchMap(id =>
        this.collectionDataService.findById(id).pipe(
          redirectOn4xx(this.router, this.authService)
        )
      )
    );

    // Logo
    this.logoRD$ = this.collectionRD$.pipe(
      map((rd: RemoteData<Collection>) => rd.payload),
      filter((col: Collection) => hasValue(col)),
      mergeMap((col: Collection) => col.logo),
    );

    // Permissões
    this.isCollectionAdmin$ = this.authorizationDataService.isAuthorized(
      FeatureID.IsCollectionAdmin
    );

    // Rota do cabeçalho
    this.collectionPageRoute$ = this.collectionRD$.pipe(
      getAllSucceededRemoteDataPayload(),
      map(col => getCollectionPageRoute(col.id)),
    );

    // Quando a coleção vier, inicializa os items e o filteredItems
    this.collectionRD$.pipe(
      getAllSucceededRemoteDataPayload(),
    ).subscribe(col => {
      // Supondo que sua Collection tenha uma propriedade .items[]
      this.items = (col as any).items || [];
      this.filteredItems = [...this.items];
    });
  }

  /** Filtra grid por termo e checkboxes */
  filter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item => {
      const matchesTerm = item.title.toLowerCase().includes(term);
      // aqui você adiciona checagem de tema/região/município se quiser
      return matchesTerm;
    });
  }

  /** Aumenta / carrega mais items (exemplo de paginação) */
  loadMore(): void {
    // implemente a lógica de paginação ou fetch de mais itens
  }

  isNotEmpty(object: any) {
    return isNotEmpty(object);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
