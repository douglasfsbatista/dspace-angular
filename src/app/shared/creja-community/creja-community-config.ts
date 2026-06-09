export type CrejaCommunityKey = 'alfa' | 'paulo' | 'ipf' | 'crejao' | 'default';

export interface CrejaCommunityConfig {
  color: string;
  footerColor: string;
  logo: string;
  home: string;
  sobre: string;
  redes: string;
  ajuda: string;
  termos: string;
  privacidade: string;
  collections?: {
    pesquisas: string;
    praticas: string;
    vozes: string;
  };
}

export const CREJA_COMMUNITY_CONFIGS: Record<CrejaCommunityKey, CrejaCommunityConfig> = {
  alfa: {
    color: '#8A0DBA',
    footerColor: '#FEE6FE',
    logo: 'assets/images/creja-alfaeja-logo.svg',
    home: '/home',
    sobre: '/sobre-o-creja',
    redes: '/redes',
    ajuda: '/ajuda-alfa-eja',
    termos: '/termos-de-uso-alfa-eja',
    privacidade: '/politicas-de-privacidade-alfa-eja',
    collections: {
      pesquisas: '/collections/420f504b-2ede-4acc-b302-666a8c58ffbf',
      praticas: '/collections/ac9d871b-3cc2-4b4e-9097-8dcfe40dd20f',
      vozes: '/collections/8d031651-c18f-4011-ac15-a28c3e69b78e',
    },
  },
  paulo: {
    color: '#075B31',
    footerColor: '#E4F4E6',
    logo: 'assets/images/creja-paulo-freire-logo.svg',
    home: '/paulo-freire-home',
    sobre: '/sobre-o-creja-paulo-freire',
    redes: '/redes-paulo-freire',
    ajuda: '/ajuda-paulo-freire',
    termos: '/termos-de-uso-paulo-freire',
    privacidade: '/politicas-de-privacidade-paulo-freire',
    collections: {
      pesquisas: '/collections/cec3209d-90f6-4e51-ada5-00b32174e762',
      praticas: '/collections/d9ed559b-9885-44f2-99cd-c72ba535f47e',
      vozes: '/collections/009d8b45-9862-48b2-97d2-aca052d3ccad',
    },
  },
  ipf: {
    color: '#2A2AC6',
    footerColor: '#DFECF2',
    logo: 'assets/images/creja-ipf-logo.svg',
    home: '/ipf-home',
    sobre: '/sobre-o-creja-ipf',
    redes: '/redes-ipf',
    ajuda: '/ajuda-ipf',
    termos: '/termos-de-uso-ipf',
    privacidade: '/politicas-de-privacidade-ipf',
    collections: {
      pesquisas: '/collections/9b91bbad-f8b8-424d-af74-80587036584a',
      praticas: '/collections/607198ac-b89b-43e3-ab28-23a755a378ee',
      vozes: '/collections/8aefaf34-edb6-4c7b-a312-b015b22f8526',
    },
  },
  crejao: {
    color: '#A0183C',
    footerColor: '#FFE6ED',
    logo: 'assets/images/crejao-logo.svg',
    home: '/creja-home',
    sobre: '/saiba-mais-creja',
    redes: '/redes-creja',
    ajuda: '/ajuda-alfa-eja',
    termos: '/termos-de-uso-alfa-eja',
    privacidade: '/politicas-de-privacidade-alfa-eja',
  },
  default: {
    color: '#8A0DBA',
    footerColor: '#FEE6FE',
    logo: 'assets/images/creja-alfaeja-logo.svg',
    home: '/home',
    sobre: '/sobre-o-creja',
    redes: '/redes',
    ajuda: '/ajuda-alfa-eja',
    termos: '/termos-de-uso-alfa-eja',
    privacidade: '/politicas-de-privacidade-alfa-eja',
    collections: {
      pesquisas: '/collections/420f504b-2ede-4acc-b302-666a8c58ffbf',
      praticas: '/collections/ac9d871b-3cc2-4b4e-9097-8dcfe40dd20f',
      vozes: '/collections/8d031651-c18f-4011-ac15-a28c3e69b78e',
    },
  },
};

const ROUTE_COMMUNITIES: Record<string, CrejaCommunityKey> = {
  'paulo-freire-home': 'paulo',
  'sobre-o-creja-paulo-freire': 'paulo',
  'politicas-de-privacidade-paulo-freire': 'paulo',
  'termos-de-uso-paulo-freire': 'paulo',
  'ajuda-paulo-freire': 'paulo',
  'redes-paulo-freire': 'paulo',
  'ipf-home': 'ipf',
  'sobre-o-creja-ipf': 'ipf',
  'ajuda-ipf': 'ipf',
  'redes-ipf': 'ipf',
  'politicas-de-privacidade-ipf': 'ipf',
  'termos-de-uso-ipf': 'ipf',
  'creja-home': 'crejao',
  'saiba-mais-creja': 'crejao',
  'redes-creja': 'crejao',
  home: 'alfa',
  'sobre-o-creja': 'alfa',
  'politicas-de-privacidade-alfa-eja': 'alfa',
  'termos-de-uso-alfa-eja': 'alfa',
  redes: 'alfa',
};

export function getCrejaCommunityByUrl(url: string): CrejaCommunityKey | undefined {
  const [firstSegment, uuid] = getPathSegments(url);
  const routeCommunity = ROUTE_COMMUNITIES[firstSegment];

  if (routeCommunity) {
    return routeCommunity;
  }

  if (firstSegment === 'collections' && uuid) {
    return getCrejaCommunityByCollectionUuid(uuid);
  }
}

export function getCrejaCommunityByCollectionUuid(uuid: string | undefined): CrejaCommunityKey | undefined {
  const normalizedUuid = uuid?.toLowerCase();

  if (!normalizedUuid) {
    return undefined;
  }

  return (Object.keys(CREJA_COMMUNITY_CONFIGS) as CrejaCommunityKey[])
    .find((community) => {
      const collections = CREJA_COMMUNITY_CONFIGS[community].collections;
      return collections && Object.values(collections)
        .some((collectionUrl) => collectionUrl.toLowerCase().endsWith(`/${normalizedUuid}`));
    });
}

export function getPathSegments(url: string): string[] {
  return url
    .split('?')[0]
    .split('#')[0]
    .split('/')
    .filter(Boolean);
}
