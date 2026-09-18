import {
  AsyncPipe,
  DOCUMENT,
} from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
} from '@angular/core';
import {
  Observable,
  of as observableOf,
} from 'rxjs';
import {
  map,
} from 'rxjs/operators';

import { RemoteData } from '../../../../../core/data/remote-data';
import { Collection } from '../../../../../core/shared/collection.model';
import { Item } from '../../../../../core/shared/item.model';
import { MetadataValue } from '../../../../../core/shared/metadata.models';
import { getCrejaHostnameByCollectionUuid } from '../../../../../shared/creja-community/creja-community-config';
import { MetadataUriValuesComponent } from '../../../../field-components/metadata-uri-values/metadata-uri-values.component';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-uri-field',
  templateUrl: './item-page-uri-field.component.html',
  imports: [
    AsyncPipe,
    MetadataUriValuesComponent,
  ],
  standalone: true,
})
/**
 * This component can be used to represent any uri on a simple item page.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key
 */
export class ItemPageUriFieldComponent extends ItemPageFieldComponent implements OnChanges {

  private static readonly crejaItemHostnamePattern = new RegExp(`https?://(?:${[
    'creja\\.paulofreire\\.org',
    'crejapf\\.paulofreire\\.org',
    'crejaipf\\.paulofreire\\.org',
    'creja\\.alfaejabrasil\\.org\\.br',
  ].join('|')})`, 'i');

  private readonly document = inject(DOCUMENT);

  metadataValues$: Observable<MetadataValue[]> = observableOf([]);

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

  ngOnChanges(): void {
    this.metadataValues$ = this.getMetadataValues();
  }

  private getMetadataValues(): Observable<MetadataValue[]> {
    if (this.item?.owningCollection) {
      return this.item.owningCollection.pipe(
        map((collectionRD: RemoteData<Collection>) => this.replaceCrejaHostname(collectionRD?.payload?.uuid)),
      );
    }

    return observableOf(this.replaceCrejaHostname());
  }

  private replaceCrejaHostname(collectionUuid?: string): MetadataValue[] {
    const hostname = this.document.location?.hostname?.toLowerCase();
    const canonicalHostname = getCrejaHostnameByCollectionUuid(collectionUuid)
      ?? this.getCanonicalHostnameFromCurrentDomain(hostname);

    return this.item?.allMetadata(this.fields).map((metadataValue) => ({
      ...metadataValue,
      value: canonicalHostname
        ? metadataValue.value.replace(
          ItemPageUriFieldComponent.crejaItemHostnamePattern,
          `https://${canonicalHostname}`,
        )
        : metadataValue.value,
    })) ?? [];
  }

  private getCanonicalHostnameFromCurrentDomain(hostname?: string): string | undefined {
    return hostname === 'crejapf.paulofreire.org'
      || hostname === 'crejaipf.paulofreire.org'
      || hostname === 'creja.alfaejabrasil.org.br'
      ? hostname
      : undefined;
  }

}
