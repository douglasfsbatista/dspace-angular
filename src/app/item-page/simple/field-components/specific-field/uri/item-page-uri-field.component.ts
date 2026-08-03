import {
  DOCUMENT,
} from '@angular/common';
import {
  Component,
  inject,
  Input,
} from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { MetadataValue } from '../../../../../core/shared/metadata.models';
import { MetadataUriValuesComponent } from '../../../../field-components/metadata-uri-values/metadata-uri-values.component';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-uri-field',
  templateUrl: './item-page-uri-field.component.html',
  imports: [
    MetadataUriValuesComponent,
  ],
  standalone: true,
})
/**
 * This component can be used to represent any uri on a simple item page.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key
 */
export class ItemPageUriFieldComponent extends ItemPageFieldComponent {

  private readonly document = inject(DOCUMENT);

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  @Input() separator: string;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   */
  @Input() fields: string[];

  /**
   * Label i18n key for the rendered metadata
   */
  @Input() label: string;

  /**
   * Replace legacy CREJA URLs in displayed item identifiers with the canonical
   * domain of the repository currently being visited.
   */
  get metadataValues(): MetadataValue[] {
    const hostname = this.document.location?.hostname?.toLowerCase();
    const canonicalHostname = hostname === 'crejapf.paulofreire.org' || hostname === 'crejaipf.paulofreire.org'
      ? hostname
      : undefined;

    return this.item?.allMetadata(this.fields).map((metadataValue) => ({
      ...metadataValue,
      value: canonicalHostname
        ? metadataValue.value.replace(/https?:\/\/creja\.paulofreire\.org/i, `https://${canonicalHostname}`)
        : metadataValue.value,
    })) ?? [];
  }

}
