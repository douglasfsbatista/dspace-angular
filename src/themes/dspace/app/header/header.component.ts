import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

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
  public isNavBarCollapsed$: Observable<boolean>;
  public isNavOpen = false; // <— precisa estar dentro da classe

  ngOnInit() {
    super.ngOnInit();
    this.isNavBarCollapsed$ = this.menuService.isMenuCollapsed(this.menuID);
  }

  // opcionais, se preferir usar no template
  toggleNav() { this.isNavOpen = !this.isNavOpen; }
  closeNav() { this.isNavOpen = false; }
}
