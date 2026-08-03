import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

/**
 * Match the shared /home entry point to a specific CREJA subdomain without
 * exposing an internal route in the browser address bar.
 */
function matchesHostname(expectedHostname: string): CanMatchFn {
  return () => {
    const document = inject(DOCUMENT);
    const hostname = document.location?.hostname?.toLowerCase();

    return hostname === expectedHostname;
  };
}

export const pauloFreireHomeDomainMatcher = matchesHostname('crejapf.paulofreire.org');
export const ipfHomeDomainMatcher = matchesHostname('crejaipf.paulofreire.org');
