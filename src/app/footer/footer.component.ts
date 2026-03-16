import {
  AsyncPipe,
  DatePipe,
  NgIf,
  NgClass,   
} from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeSocialComponent } from '../../themes/custom/app/creja-home/home-social/home-social.component';
import {
  Observable,
  of as observableOf,
} from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  APP_CONFIG,
  AppConfig,
} from '../../config/app-config.interface';
import { NotifyInfoService } from '../core/coar-notify/notify-info/notify-info.service';
import { AuthorizationDataService } from '../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../core/data/feature-authorization/feature-id';
import { KlaroService } from '../shared/cookies/klaro.service';
import { hasValue } from '../shared/empty.util';

@Component({
  selector: 'ds-base-footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink, AsyncPipe, DatePipe, TranslateModule, HomeSocialComponent,],
})
export class FooterComponent implements OnInit {

  dateObj: number = Date.now();

  currentCommunity: string = 'default';

  // 🔥 NOVA PROPRIEDADE PARA CONTROLAR A COR
  footerBottomColor: string = '#D5D5D5';

  showTopFooter = false;
  showPrivacyPolicy: boolean;
  showEndUserAgreement: boolean;
  showSendFeedback$: Observable<boolean>;
  coarLdnEnabled$: Observable<boolean>;

  constructor(
    @Optional() public cookies: KlaroService,
    protected authorizationService: AuthorizationDataService,
    protected notifyInfoService: NotifyInfoService,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Define no carregamento inicial
    this.setCommunity(this.router.url);

    // Atualiza ao navegar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setCommunity(event.urlAfterRedirects);
      });

    this.showPrivacyPolicy = this.appConfig.info.enablePrivacyStatement;
    this.showEndUserAgreement = this.appConfig.info.enableEndUserAgreement;
    this.coarLdnEnabled$ = this.appConfig.info.enableCOARNotifySupport
      ? this.notifyInfoService.isCoarConfigEnabled()
      : observableOf(false);
    this.showSendFeedback$ = this.authorizationService.isAuthorized(FeatureID.CanSendFeedback);
  }

  private setCommunity(url: string): void {

    if (url.includes('paulo-freire')) {
      this.currentCommunity = 'paulo';
      this.footerBottomColor = '#E4F4E6';

    } else if (url.includes('ipf')) {
      this.currentCommunity = 'ipf';
      this.footerBottomColor = '#DFECF2';

    } else if (url.includes('creja-home') || url.includes('saiba-mais-creja') || url.includes('redes-creja')) {
      this.currentCommunity = 'crejao';
      this.footerBottomColor = '#FFE6ED';

    } else if (url.includes('home')) {
      this.currentCommunity = 'home';
      this.footerBottomColor = '#FEE6FE';

    } else if (url.includes('saiba-mais-creja')) {
      this.currentCommunity = 'saiba-mais-creja';
      this.footerBottomColor = '#FFE6ED';

    }else {
      this.currentCommunity = 'default';
      this.footerBottomColor = '#FEE6FE';
    }

    console.log('Footer comunidade detectada:', this.currentCommunity);
  }

  showCookieSettings() {
    if (hasValue(this.cookies)) {
      this.cookies.showSettings();
    }
    return false;
  }
}
