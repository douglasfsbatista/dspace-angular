import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ContrastService } from '../../shared/accessibility/contrast.service';

@Component({
  selector: 'ds-accessibility-contrast',
  templateUrl: './accessibility-contrast.component.html',
  styleUrls: ['./accessibility-contrast.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    TranslateModule,
  ],
})
export class AccessibilityContrastComponent {
  public readonly isEnabled$ = this.contrastService.isEnabled$;

  constructor(
    public contrastService: ContrastService,
  ) {
  }
}
