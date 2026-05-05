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
  currentCommunity: string = 'default';

  constructor(
    protected menuService: MenuService,
    protected windowService: HostWindowService,
    private router: Router,
    private http: HttpClient
  ) {
    super(menuService, windowService);
  }

  /*
  CONFIGURAÇÃO DAS COMUNIDADES
  */

  communityConfigs: any = {

    alfa: {
      color: '#8A0DBA',
      logo: 'assets/images/creja-alfaeja-logo.svg',
      home: '/home',
      sobre: '/sobre-o-creja',
      collections: {
        pesquisas: '/collections/420f504b-2ede-4acc-b302-666a8c58ffbf',
        praticas: '/collections/ac9d871b-3cc2-4b4e-9097-8dcfe40dd20f',
        vozes: '/collections/8d031651-c18f-4011-ac15-a28c3e69b78e'
      }
    },

    paulo: {
      color: '#075B31',
      logo: 'assets/images/creja-paulo-freire-logo.svg',
      home: '/paulo-freire-home',
      sobre: '/sobre-o-creja-paulo-freire',
      collections: {
        pesquisas: '/collections/cec3209d-90f6-4e51-ada5-00b32174e762',
        praticas: '/collections/d9ed559b-9885-44f2-99cd-c72ba535f47e',
        vozes: '/collections/009d8b45-9862-48b2-97d2-aca052d3ccad'
      }
    },

    ipf: {
      color: '#2A2AC6',
      logo: 'assets/images/creja-ipf-logo.svg',
      home: '/ipf-home',
      sobre: '/sobre-o-creja-ipf',
      collections: {
        pesquisas: '/collections/9b91bbad-f8b8-424d-af74-80587036584a',
        praticas: '/collections/607198ac-b89b-43e3-ab28-23a755a378ee',
        vozes: '/collections/8aefaf34-edb6-4c7b-a312-b015b22f8526'
      }
    },

    crejao: {
      color: '#A0183C',
      logo: 'assets/images/crejao-logo.svg',
      home: '/creja-home',
      sobre: '/saiba-mais-creja'
    },

    default: {
      color: '#8A0DBA',
      logo: 'assets/images/creja-alfaeja-logo.svg',
      home: '/home',
      sobre: '/sobre-o-creja',
      collections: {
        pesquisas: '/collections/420f504b-2ede-4acc-b302-666a8c58ffbf',
        praticas: '/collections/ac9d871b-3cc2-4b4e-9097-8dcfe40dd20f',
        vozes: '/collections/8d031651-c18f-4011-ac15-a28c3e69b78e'
      }
    }

  };

  get config() {
    return this.communityConfigs[this.currentCommunity] || this.communityConfigs.default;
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

    const segments = url.split('/');

    // rota normal
    const first = segments[1];

    const routeMap: any = {

      'paulo-freire-home': 'paulo',
      'sobre-o-creja-paulo-freire': 'paulo',
      'politicas-de-privacidade-paulo-freire': 'paulo',
      'termos-de-uso-paulo-freire': 'paulo',

      'ipf-home': 'ipf',
      'sobre-o-creja-ipf': 'ipf',

      'creja-home': 'crejao',
      'saiba-mais-creja': 'crejao',
      'redes-creja': 'crejao',

      'home': 'alfa',
      'sobre-o-creja': 'alfa',
      'redes': 'alfa'
    };

    if (routeMap[first]) {
      this.currentCommunity = routeMap[first];
      return;
    }

    /*
    CASO SEJA COLLECTION
    */

    if (first === 'collections') {

      const uuid = segments[2];

      this.http.get(`/server/api/core/collections/${uuid}?embed=parentCommunity`)
        .subscribe((res: any) => {

          const name = res?._embedded?.parentCommunity?.name?.toLowerCase() || '';

          if (name.includes('paulo')) this.currentCommunity = 'paulo';
          else if (name.includes('ipf')) this.currentCommunity = 'ipf';
          else this.currentCommunity = 'alfa';

        });

      return;
    }

    /*
    CASO SEJA ITEM
    */

    if (first === 'items') {

      const uuid = segments[2];

      this.http.get(`/server/api/core/items/${uuid}?embed=owningCollection`)
        .subscribe((res: any) => {

          const collectionUuid = res?._embedded?.owningCollection?.uuid;

          this.detectCommunity(`/collections/${collectionUuid}`);

        });

      return;
    }

    this.currentCommunity = 'default';

  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  closeNav() {
    this.isNavOpen = false;
  }

}
