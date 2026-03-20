import {
  Component,
} from '@angular/core';

import { SearchFilterComponent as BaseComponent } from '../../../../../../../app/shared/search/search-filters/search-filter/search-filter.component';

import { slide } from '../../../../../../../app/shared/animations/slide';

import {
  AsyncPipe,
  LowerCasePipe,
  NgClass,
  NgIf,
} from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { BrowserOnlyPipe } from '../../../../../../../app/shared/utils/browser-only.pipe';

import { SearchFacetFilterWrapperComponent } from '../../../../../../../app/shared/search/search-filters/search-filter/search-facet-filter-wrapper/search-facet-filter-wrapper.component';

@Component({
  selector: 'ds-themed-search-filter',
  styleUrls: ['./search-filter.component.scss'],
  templateUrl: './search-filter.component.html',
  animations: [slide],
  standalone: true,
  imports: [NgIf, NgClass, SearchFacetFilterWrapperComponent, AsyncPipe, LowerCasePipe, TranslateModule, BrowserOnlyPipe],
})

/**
 * Represents a part of the filter section for a single type of filter
 */
export class SearchFilterComponent extends BaseComponent {
}