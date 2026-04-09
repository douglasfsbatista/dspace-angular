import {
  AsyncPipe,
  DatePipe,
  NgIf,
  NgClass,
} from '@angular/common';
import {
  Component,
  Inject,
  Optional,
} from '@angular/core';
import { HomeSocialComponent } from '../../../custom/app/creja-home/home-social/home-social.component';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { KlaroService } from 'src/app/shared/cookies/klaro.service';
import { AuthorizationDataService } from 'src/app/core/data/feature-authorization/authorization-data.service';
import { NotifyInfoService } from 'src/app/core/coar-notify/notify-info/notify-info.service';
import { APP_CONFIG, AppConfig } from 'src/config/app-config.interface';

@Component({
  selector: 'ds-themed-footer',
  styleUrls: ['./footer.component.scss'],
  // styleUrls: ['../../../../app/footer/footer.component.scss'],
  templateUrl: './footer.component.html',
  // templateUrl: '../../../../app/footer/footer.component.html',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink, AsyncPipe, DatePipe, TranslateModule, HomeSocialComponent],
})
export class FooterComponent extends BaseComponent {
  currentCommunity: string = 'default';

  // 🔥 NOVA PROPRIEDADE PARA CONTROLAR A COR
  footerBottomColor: string = '#D5D5D5';

  constructor(
    @Optional() public cookies: KlaroService,
    protected authorizationService: AuthorizationDataService,
    protected notifyInfoService: NotifyInfoService,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    private router: Router
  ) {
    super(cookies, authorizationService, notifyInfoService, appConfig);
  }

  ngOnInit(): void {
    this.setCommunity(this.router.url);

    super.ngOnInit();
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

    } else {
      this.currentCommunity = 'default';
      this.footerBottomColor = '#FEE6FE';
    }
  }
}
