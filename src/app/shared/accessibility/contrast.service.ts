import {
  DOCUMENT,
  isPlatformBrowser,
} from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const CONTRAST_STORAGE_KEY = 'ds-accessibility-grayscale';
const CONTRAST_CLASS = 'ds-accessibility-grayscale';

@Injectable({
  providedIn: 'root',
})
export class ContrastService {
  public readonly isEnabled$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setEnabled(localStorage.getItem(CONTRAST_STORAGE_KEY) === 'true', false);
    }
  }

  public toggle(): void {
    this.setEnabled(!this.isEnabled$.value);
  }

  private setEnabled(isEnabled: boolean, persist = true): void {
    this.isEnabled$.next(isEnabled);
    this.document.documentElement.classList.toggle(CONTRAST_CLASS, isEnabled);

    if (persist && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(CONTRAST_STORAGE_KEY, `${isEnabled}`);
    }
  }
}
