import { quoteHtmlAttr } from './core/helpers/html';

// prettier-ignore
const rubricTitles: Record<string, string> = {
  'worship-crosses': 'Поклонные кресты',
  'grave-crosses': 'Намогильные кресты',
  'fences': 'Цветники, ограды, лавочки',
  'jewelry': 'Ювелирные кресты мастерской Юрия Федорова',
};
const rubricIds = Object.keys(rubricTitles);

const catalogUrlPrefix = '/catalog/';

/** Update breadcrumbs section (add the catalogue section link) */
function addBreadcrumbs(productNode: HTMLElement) {
  const breadcrumbsNode = document.querySelector('.uc-Breadcrumbs .t758__list');
  if (!breadcrumbsNode) {
    return;
  }
  const skuNode = productNode.querySelector('.js-store-prod-sku');
  const skuId = skuNode?.innerHTML.trim();
  // Future rubric id (from pathname or sku id)
  let rubricId = '';
  // Parse title string
  const { pathname } = window.location;
  const pathNameMatch = pathname.match(/^((.*)\/([A-z0-9_-]+))\/(tproduct\/.*)$/);
  if (pathNameMatch) {
    const [
      _,
      _rubricUrl,
      _productsUrl = '/products',
      pathnameId = '',
      // _itemUrl,
    ] = pathNameMatch;
    rubricId = pathnameId;
  }
  let rubricTitle = quoteHtmlAttr(rubricTitles[rubricId] || '');
  if ((!rubricId || !rubricTitle) && skuId) {
    for (const id of rubricIds) {
      if (skuId.startsWith(id)) {
        rubricId = id;
        rubricTitle = quoteHtmlAttr(rubricTitles[rubricId] || '');
        break;
      }
    }
  }
  console.log('[StoreProduct:addBreadcrumbs]', {
    rubricTitle,
    rubricId,
    skuId,
    pathNameMatch,
    pathname,
  });
  if (!rubricTitle || !rubricId) {
    // eslint-disable-next-line no-console
    console.warn('[StoreProduct:addBreadcrumbs] Cannot find parse catalog product pathname', {
      rubricId,
      skuId,
      pathNameMatch,
      pathname,
    });
    debugger; // eslint-disable-line no-debugger
    return;
  }
  // Find lst breadcrumbs item and clone it
  const items = Array.from(breadcrumbsNode.children) as HTMLElement[];
  // Find the first and the last items...
  const lastIdx = items.length - 1;
  const firstItem = items[0];
  const lastItem = items[lastIdx];
  const lastLink = lastItem?.querySelector('a');
  const newItem = firstItem?.cloneNode(true) as HTMLElement;
  const newLink = newItem?.querySelector('a');
  if (newLink && lastLink) {
    // Set middle (new) link from last
    newLink.setAttribute('href', lastLink.getAttribute('href'));
    newLink.innerText = lastLink.innerText;
    // Set last link for the current product item
    lastLink.setAttribute('href', catalogUrlPrefix + rubricId);
    lastLink.innerText = rubricTitle;
  }
  breadcrumbsNode.insertBefore(newItem, lastItem);
}

/** Move action blocks from the footer source blocks, update the icons */
function appendActionsAndLabels(rightColumn: HTMLElement) {
  const badgesNode = document.querySelector('.uc-ProductBadges'); // ?.cloneNode(true) as Element; // Clone to debug original node
  if (badgesNode) {
    badgesNode.classList.add('Buttons', 'Badges');
    rightColumn.append(badgesNode);
    // const btns = badgesNode.querySelectorAll('.t-btn');
    // btns[0]?.insertAdjacentHTML('afterbegin', '<i class="fa fa-gift"></i> ');
  }
  const actionsNode = document.querySelector('.uc-ProductActions'); // ?.cloneNode(true) as Element; // Clone to debug original node
  if (actionsNode) {
    actionsNode.classList.add('Buttons', 'Actions');
    rightColumn.append(actionsNode);
    // const btns = actionsNode.querySelectorAll('.t-btn');
    // btns[0]?.insertAdjacentHTML('afterbegin', '<i class="fa fa-shopping-cart"></i> ');
    // btns[1]?.insertAdjacentHTML('afterbegin', '<i class="fa fa-bolt"></i> ');
    // btns[2]?.insertAdjacentHTML('afterbegin', '<i class="fa fa-gift"></i> ');
  }
}

/** Add product name to the form to make it visible in the CRM */
function addProductTitleToForms() {
  const productTitle = quoteHtmlAttr(document.title);
  const formFields = [
    document.querySelector('.uc-OrderProductForm form input[name="tildaspec-formname"]'),
    document.querySelector('.uc-OrderProductForm form input[name="product"]'),
    document.querySelector('.uc-GetKPForm form input[name="tildaspec-formname"]'),
    document.querySelector('.uc-GetKPForm form input[name="product"]'),
  ].filter(Boolean);
  if (formFields && productTitle) {
    formFields.forEach((it: HTMLInputElement) => {
      it.value = [it.value, productTitle].filter(Boolean).join(': ');
    });
  }
}

/** Clone titile to above the form to make it visible at the topmost position in moobile screens */
function cloneTitleToTheTop(productNode: HTMLElement) {
  const titleNode = productNode.querySelector<HTMLElement>('.t-store__prod-popup__title-wrapper');
  const wrapper = `
  <div class="t-container MobileTitle">
  </div>
  `;
  productNode.insertAdjacentHTML('afterbegin', wrapper);
  const mobileTitleNode = productNode.querySelector<HTMLElement>('.MobileTitle');
  mobileTitleNode.append(titleNode.cloneNode(true));
}

/** Make thumbs wrapper 'fit' if there are less than 4 items */
function initThumbs(productNode: HTMLElement) {
  // t-slds__thumbsbullet-wrapper
  const wrapperNode = productNode.querySelector<HTMLElement>('.t-slds__thumbsbullet-wrapper');
  const items = wrapperNode?.querySelectorAll<HTMLElement>('.t-slds__bullet');
  // Do nothing if there no thumbnails at all or there are too many of them
  if (!items || items.length < 4 || items.length > 8) {
    return;
  }
  wrapperNode.classList.add('fit');
}

export function initStoreProduct() {
  const rootNode = document.querySelector<HTMLElement>('.t-rec > .t-store');
  const productNode = rootNode?.querySelector<HTMLElement>('.js-store-product.js-product');
  if (!rootNode || !productNode) {
    return;
  }
  // Only if product page has been found, else do nothing
  const rightColumn = productNode.querySelector<HTMLElement>('.t-store__prod-popup__col-right');
  addBreadcrumbs(productNode);
  appendActionsAndLabels(rightColumn);
  addProductTitleToForms();
  cloneTitleToTheTop(productNode);
  initThumbs(productNode);
}
