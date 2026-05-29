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

const FONT_SIZE_STORAGE_KEY = 'ds-accessibility-font-size';
const DEFAULT_FONT_SIZE = 100;
const MIN_FONT_SIZE = 100;
const MAX_FONT_SIZE = 130;
const FONT_SIZE_STEP = 10;

@Injectable({
  providedIn: 'root',
})
export class FontSizeService {
  public readonly fontSize$ = new BehaviorSubject<number>(DEFAULT_FONT_SIZE);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setFontSize(this.getStoredFontSize(), false);
    }
  }

  public increase(): void {
    this.setFontSize(this.fontSize$.value + FONT_SIZE_STEP);
  }

  public decrease(): void {
    this.setFontSize(this.fontSize$.value - FONT_SIZE_STEP);
  }

  public reset(): void {
    this.setFontSize(DEFAULT_FONT_SIZE);
  }

  public canIncrease(fontSize: number): boolean {
    return fontSize < MAX_FONT_SIZE;
  }

  public canDecrease(fontSize: number): boolean {
    return fontSize > MIN_FONT_SIZE;
  }

  private setFontSize(fontSize: number, persist = true): void {
    const normalizedFontSize = this.normalizeFontSize(fontSize);
    this.fontSize$.next(normalizedFontSize);
    this.applyFontSize(normalizedFontSize);

    if (persist && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, `${normalizedFontSize}`);
    }
  }

  private applyFontSize(fontSize: number): void {
    this.document.documentElement.style.fontSize = `${fontSize}%`;
    this.document.documentElement.style.setProperty('--ds-accessibility-font-size', `${fontSize}%`);
  }

  private getStoredFontSize(): number {
    const storedFontSize = Number(localStorage.getItem(FONT_SIZE_STORAGE_KEY));
    return Number.isFinite(storedFontSize) ? storedFontSize : DEFAULT_FONT_SIZE;
  }

  private normalizeFontSize(fontSize: number): number {
    return Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, fontSize));
  }
}
