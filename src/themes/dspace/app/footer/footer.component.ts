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
import {
  CREJA_COMMUNITY_CONFIGS,
  CrejaCommunityKey,
  getCrejaCommunityByUrl,
} from 'src/app/shared/creja-community/creja-community-config';

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
  currentCommunity: CrejaCommunityKey = 'default';

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

  get config() {
    return CREJA_COMMUNITY_CONFIGS[this.currentCommunity] || CREJA_COMMUNITY_CONFIGS.default;
  }

  ngOnInit(): void {
    this.setCommunity(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setCommunity(event.urlAfterRedirects);
      });

    super.ngOnInit();
  }

  private setCommunity(url: string): void {
    this.currentCommunity = getCrejaCommunityByUrl(url) || 'default';
    this.footerBottomColor = this.config.footerColor;
  }
}
