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
import { HttpClient } from '@angular/common/http';
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
  getCrejaCommunityByCollectionUuid,
  getCrejaCommunityByUrl,
  getPathSegments,
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
    private router: Router,
    private http: HttpClient,
  ) {
    super(cookies, authorizationService, notifyInfoService, appConfig);
  }

  get config() {
    return CREJA_COMMUNITY_CONFIGS[this.currentCommunity] || CREJA_COMMUNITY_CONFIGS.default;
  }

  ngOnInit(): void {
    this.detectCommunity(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.detectCommunity(event.urlAfterRedirects);
      });

    super.ngOnInit();
  }

  private detectCommunity(url: string): void {
    const community = getCrejaCommunityByUrl(url);

    if (community) {
      this.setCommunity(community);
      return;
    }

    const [first, uuid] = getPathSegments(url);

    if (first === 'collections' && uuid) {
      this.http.get(`/server/api/core/collections/${uuid}?embed=parentCommunity`)
        .subscribe((res: any) => {
          const name = res?._embedded?.parentCommunity?.name?.toLowerCase() || '';
          this.setCommunity(this.getCommunityFromName(name));
        });

      return;
    }

    if (first === 'items' && uuid) {
      this.http.get(`/server/api/core/items/${uuid}?embed=owningCollection`)
        .subscribe((res: any) => {
          const collectionUuid = res?._embedded?.owningCollection?.uuid;
          const communityByCollection = getCrejaCommunityByCollectionUuid(collectionUuid);

          if (communityByCollection) {
            this.setCommunity(communityByCollection);
          } else {
            this.detectCommunity(`/collections/${collectionUuid}`);
          }
        });

      return;
    }

    this.setCommunity('default');
  }

  private setCommunity(community: CrejaCommunityKey): void {
    this.currentCommunity = community;
    this.footerBottomColor = this.config.footerColor;
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
}
