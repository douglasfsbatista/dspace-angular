import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, NavigationEnd } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { MenuService } from 'src/app/shared/menu/menu.service';
import { HostWindowService } from 'src/app/shared/host-window.service';

import { ThemedLangSwitchComponent } from 'src/app/shared/lang-switch/themed-lang-switch.component';
import { ThemedSearchFormComponent } from 'src/app/shared/search-form/themed-search-form.component';
import { ContextHelpToggleComponent } from 'src/app/header/context-help-toggle/context-help-toggle.component';
import { HeaderComponent as BaseComponent } from 'src/app/header/header.component';
import { ThemedNavbarComponent } from 'src/app/navbar/themed-navbar.component';
import { AccessibilityFontSizeComponent } from '../../../../app/header/accessibility-font-size/accessibility-font-size.component';
import { ThemedSearchNavbarComponent } from 'src/app/search-navbar/themed-search-navbar.component';
import { ThemedAuthNavMenuComponent } from 'src/app/shared/auth-nav-menu/themed-auth-nav-menu.component';
import {
  CREJA_COMMUNITY_CONFIGS,
  CrejaCommunityKey,
  getCrejaCommunityByCollectionUuid,
  getCrejaCommunityByUrl,
  getPathSegments,
} from 'src/app/shared/creja-community/creja-community-config';
import { ImpersonateNavbarComponent } from 'src/app/shared/impersonate-navbar/impersonate-navbar.component';

@Component({
  selector: 'ds-themed-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
  standalone: true,
  imports: [
    NgbDropdownModule,
    ThemedLangSwitchComponent,
    ThemedSearchFormComponent,
    RouterLink,
    RouterModule,
    ThemedSearchNavbarComponent,
    AccessibilityFontSizeComponent,
    ContextHelpToggleComponent,
    ThemedAuthNavMenuComponent,
    ImpersonateNavbarComponent,
    ThemedNavbarComponent,
    TranslateModule,
    AsyncPipe,
    NgIf,
  ],
})
export class HeaderComponent extends BaseComponent implements OnInit {

  public isNavOpen = false;
  currentCommunity: CrejaCommunityKey = 'default';

  constructor(
    protected menuService: MenuService,
    protected windowService: HostWindowService,
    private router: Router,
    private http: HttpClient
  ) {
    super(menuService, windowService);
  }

  get config() {
    return CREJA_COMMUNITY_CONFIGS[this.currentCommunity] || CREJA_COMMUNITY_CONFIGS.default;
  }

  ngOnInit(): void {

    super.ngOnInit();

    this.detectCommunity(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.detectCommunity(event.urlAfterRedirects);
      });
  }

  /*
  DETECÇÃO DA COMUNIDADE
  */

  private detectCommunity(url: string): void {

    const community = getCrejaCommunityByUrl(url);

    if (community) {
      this.currentCommunity = community;
      return;
    }

    const [first, uuid] = getPathSegments(url);

    /*
    CASO SEJA COLLECTION
    */

    if (first === 'collections' && uuid) {

      this.http.get(`/server/api/core/collections/${uuid}?embed=parentCommunity`)
        .subscribe((res: any) => {
          const name = res?._embedded?.parentCommunity?.name?.toLowerCase() || '';
          this.currentCommunity = this.getCommunityFromName(name);
        });

      return;
    }

    /*
    CASO SEJA ITEM
    */

    if (first === 'items' && uuid) {

      this.http.get(`/server/api/core/items/${uuid}?embed=owningCollection`)
        .subscribe((res: any) => {

          const collectionUuid = res?._embedded?.owningCollection?.uuid;
          const communityByCollection = getCrejaCommunityByCollectionUuid(collectionUuid);

          if (communityByCollection) {
            this.currentCommunity = communityByCollection;
          } else {
            this.detectCommunity(`/collections/${collectionUuid}`);
          }

        });

      return;
    }

    this.currentCommunity = 'default';

  }

  private getCommunityFromName(name: string): CrejaCommunityKey {
    if (name.includes('paulo')) {
      return 'paulo';
    }

    if (name.includes('ipf')) {
      return 'ipf';
    }

    return 'alfa';
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  closeNav() {
    this.isNavOpen = false;
  }

}
