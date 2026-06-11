import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  Router,
  RouterLink,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import {
  combineLatest as observableCombineLatest,
  Observable,
  of as observableOf,
} from 'rxjs';
import { map } from 'rxjs/operators';

import {
  getBitstreamDownloadRoute,
  getBitstreamRequestACopyRoute,
} from '../../app-routing-paths';
import { DSONameService } from '../../core/breadcrumbs/dso-name.service';
import { AuthorizationDataService } from '../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../core/data/feature-authorization/feature-id';
import {
  NativeWindowRef,
  NativeWindowService,
} from '../../core/services/window.service';
import { Bitstream } from '../../core/shared/bitstream.model';
import { Item } from '../../core/shared/item.model';
import {
  hasValue,
  isNotEmpty,
} from '../empty.util';

interface BitstreamPath {
  routerLink: string;
  queryParams: any;
}

@Component({
  selector: 'ds-base-file-download-link',
  templateUrl: './file-download-link.component.html',
  styleUrls: ['./file-download-link.component.scss'],
  standalone: true,
  imports: [RouterLink, NgClass, NgIf, NgTemplateOutlet, AsyncPipe, TranslateModule],
})
/**
 * Component displaying a download link
 * When the user is authenticated, a short-lived token retrieved from the REST API is added to the download link,
 * ensuring the user is authorized to download the file.
 */
export class FileDownloadLinkComponent implements OnInit {

  /**
   * Optional bitstream instead of href and file name
   */
  @Input() bitstream: Bitstream;

  @Input() item: Item;

  /**
   * Additional css classes to apply to link
   */
  @Input() cssClasses = '';

  /**
   * A boolean representing if link is shown in same tab or in a new one.
   */
  @Input() isBlank = false;

  @Input() enableRequestACopy = true;

  bitstreamPath$: Observable<BitstreamPath>;

  canDownload$: Observable<boolean>;

  downloadTermsAccepted = false;

  private pendingDownloadPath: BitstreamPath;

  private pendingOpenInNewTab = false;

  constructor(
    private authorizationService: AuthorizationDataService,
    public dsoNameService: DSONameService,
    private modalService: NgbModal,
    private router: Router,
    @Inject(NativeWindowService) private _window: NativeWindowRef,
  ) {
  }

  ngOnInit() {
    if (this.enableRequestACopy) {
      this.canDownload$ = this.authorizationService.isAuthorized(FeatureID.CanDownload, isNotEmpty(this.bitstream) ? this.bitstream.self : undefined);
      const canRequestACopy$ = this.authorizationService.isAuthorized(FeatureID.CanRequestACopy, isNotEmpty(this.bitstream) ? this.bitstream.self : undefined);
      this.bitstreamPath$ = observableCombineLatest([this.canDownload$, canRequestACopy$]).pipe(
        map(([canDownload, canRequestACopy]) => this.getBitstreamPath(canDownload, canRequestACopy)),
      );
    } else {
      this.bitstreamPath$ = observableOf(this.getBitstreamDownloadPath());
      this.canDownload$ = observableOf(true);
    }
  }

  getBitstreamPath(canDownload: boolean, canRequestACopy: boolean) {
    if (!canDownload && canRequestACopy && hasValue(this.item)) {
      return getBitstreamRequestACopyRoute(this.item, this.bitstream);
    }
    return this.getBitstreamDownloadPath();
  }

  getBitstreamDownloadPath() {
    return {
      routerLink: getBitstreamDownloadRoute(this.bitstream),
      queryParams: {},
    };
  }

  onDownloadClick(
    event: MouseEvent,
    content: TemplateRef<any>,
    bitstreamPath: BitstreamPath | null | undefined,
    canDownload: boolean | null,
  ): void {
    if (canDownload !== true || !hasValue(this.item)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (bitstreamPath === null || bitstreamPath === undefined) {
      return;
    }

    this.downloadTermsAccepted = false;
    this.pendingDownloadPath = bitstreamPath;
    this.pendingOpenInNewTab = this.isBlank || event.ctrlKey || event.metaKey || event.shiftKey;
    this.modalService.open(content, {
      ariaLabelledBy: 'creja-download-terms-title',
      centered: true,
    });
  }

  confirmTermsAndDownload(closeModal: (result?: any) => void): void {
    if (!this.downloadTermsAccepted || !hasValue(this.pendingDownloadPath)) {
      return;
    }

    const bitstreamPath = this.pendingDownloadPath;
    const openInNewTab = this.pendingOpenInNewTab;
    this.pendingDownloadPath = undefined;
    this.pendingOpenInNewTab = false;
    closeModal('ok');

    const urlTree = this.router.createUrlTree([bitstreamPath.routerLink], {
      queryParams: bitstreamPath.queryParams,
    });

    if (openInNewTab && this._window.nativeWindow) {
      this._window.nativeWindow.open(this.router.serializeUrl(urlTree), '_blank', 'noopener');
    } else {
      void this.router.navigateByUrl(urlTree);
    }
  }
}
