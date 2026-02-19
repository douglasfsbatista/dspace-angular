import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, NavigationEnd } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MenuService } from 'src/app/shared/menu/menu.service';
import { HostWindowService } from 'src/app/shared/host-window.service';

import { ThemedLangSwitchComponent } from 'src/app/shared/lang-switch/themed-lang-switch.component';
import { ThemedSearchFormComponent } from 'src/app/shared/search-form/themed-search-form.component';
import { ContextHelpToggleComponent } from 'src/app/header/context-help-toggle/context-help-toggle.component';
import { HeaderComponent as BaseComponent } from 'src/app/header/header.component';
import { ThemedNavbarComponent } from 'src/app/navbar/themed-navbar.component';
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
    private router: Router
  ) {
    // 🔥 super recebe exatamente os 2 argumentos do pai
    super(menuService, windowService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Detecta na carga inicial
    this.setCommunity(this.router.url);

    // Atualiza ao navegar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setCommunity(event.urlAfterRedirects);
      });
  }

  private setCommunity(url: string): void {

    if (url.includes('paulo-freire')) {
      this.currentCommunity = 'paulo';

    } else if (url.includes('ipf')) {
      this.currentCommunity = 'ipf';

    } else if (url.includes('crejao')) {
      this.currentCommunity = 'crejao';

    } else if (url.includes('home') || url.includes('alfa')) {
      this.currentCommunity = 'alfa';

    } else {
      this.currentCommunity = 'default';
    }
  }

  getHeaderColor(): string {
    switch (this.currentCommunity) {
      case 'alfa': return '#8A0DBA';
      case 'ipf': return '#2A2AC6';
      case 'paulo': return '#075B31';
      case 'crejao': return '#A0183C';
      default: return '#8A0DBA';
    }
  }

  getLogo(): string {
    switch (this.currentCommunity) {
      case 'paulo': return 'assets/images/creja-paulo-freire-logo.svg';
      case 'ipf': return 'assets/images/creja-ipf-logo.svg';
      case 'crejao': return 'assets/images/crejao-logo.svg';
      case 'alfa':
      default:
        return 'assets/images/creja-alfaeja-logo.svg';
    }
  }

  toggleNav() { this.isNavOpen = !this.isNavOpen; }
  closeNav() { this.isNavOpen = false; }
}
