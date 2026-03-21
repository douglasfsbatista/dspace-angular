import { NgIf } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';

import { Bitstream } from '../../../../../../app/core/shared/bitstream.model';
import { ComcolPageLogoComponent as BaseComponent } from '../../../../../../app/shared/comcol/comcol-page-logo/comcol-page-logo.component';

@Component({
  selector: 'ds-comcol-page-logo',
  styleUrls: ['../../../../../../app/shared/comcol/comcol-page-logo/comcol-page-logo.component.scss'],
  templateUrl: './comcol-page-logo.component.html',
  imports: [NgIf],
  standalone: true,
})
export class ComcolPageLogoComponent extends BaseComponent {
  @Input() src: string;
}
