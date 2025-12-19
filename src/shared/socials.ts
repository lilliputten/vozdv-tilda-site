import maxWhiteSvg from '../assets/socials/max-white.svg';

// import ozonSvg from '../assets/socials/ozon.svg';
// import wbSvg from '../assets/socials/wb.svg';

interface TSocial {
  urlPrefixes: string[];
  footerSvgData: string;
  productTitle?: string;
}

export const socials: Record<string, TSocial> = {
  /*
   * ozon: {
   *   svgData: ozonSvg,
   *   urlPrefixes: ['https://ozon.ru/', 'https://www.ozon.ru/'],
   *   productTitle: 'Купить на Ozon',
   * },
   * wb: {
   *   svgData: wbSvg,
   *   urlPrefixes: ['https://wildberries.ru/', 'https://www.wildberries.ru/'],
   *   productTitle: 'Купить на Wildberries',
   * },
   */
  max: {
    footerSvgData: maxWhiteSvg,
    urlPrefixes: ['https://max.ru/', 'https://www.max.ru/'],
    productTitle: 'Купить на Wildberries',
  },
};
