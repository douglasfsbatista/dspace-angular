import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { FontSizeService } from '../../shared/accessibility/font-size.service';

@Component({
  selector: 'ds-accessibility-font-size',
  templateUrl: './accessibility-font-size.component.html',
  styleUrls: ['./accessibility-font-size.component.scss'],
  standalone: true,
  imports: [
    NgbDropdownModule,
    TranslateModule,
    AsyncPipe,
    NgIf,
  ],
})
export class AccessibilityFontSizeComponent {
  public readonly fontSize$ = this.fontSizeService.fontSize$;

  constructor(
    public fontSizeService: FontSizeService,
  ) {
  }
}
