/* // Structure:

navMenu:

.uc-NavHeader
  .t820
    .t-container
      .t-col

.uc-NavMenu
  .t1272
    .tmenu-mobile
    .t-menu-base
      .t-menu-base__maincontainer

  .tmenu-mobile__menucontent_hidden -- To hide on mobile
*/

function updateNavMenuHeight(
  navMenu: HTMLDivElement,
  menuBase: HTMLDivElement,
  menuMobileBase: HTMLDivElement,
) {
  // const width = window.innerWidth;
  let setHeight: number = 0;
  // Calculate heights of menuBase and menuMobileBase and set it to navMenu
  const menuBaseHeight = menuBase?.offsetHeight || 0;
  const menuMobileBaseHeight = menuMobileBase?.offsetHeight || 0;
  setHeight = menuBaseHeight + menuMobileBaseHeight;
  navMenu.style.height = `${setHeight}px`;
}

function setupNodes(navHeader: HTMLDivElement, navMenu: HTMLDivElement) {
  // Header nodes...
  const headerWrapper = navHeader.querySelector<HTMLDivElement>('.t820');
  if (!headerWrapper) {
    // eslint-disable-next-line no-console
    console.warn('[NavHeader:setupNodes] Not found headerWrapper (.t820)');
    return;
  }
  headerWrapper.classList.add('t-container');
  // const headerContainer = headerWrapper.querySelector<HTMLDivElement>('.t820__container');
  // Menu nodes...
  const menuWrapper = navMenu.querySelector<HTMLDivElement>('.t1272');
  const menuBase = menuWrapper.querySelector<HTMLDivElement>('.t-menu-base');
  const menuMobileBase = menuWrapper.querySelector<HTMLDivElement>('.t-menu-base__mobile-menu');
  const logoBase = menuBase.querySelector<HTMLDivElement>('.t-menu-base__logo');
  const logoClone = logoBase.cloneNode(true);
  menuBase.prepend(navHeader);
  headerWrapper.prepend(logoClone);

  // Wrap all menuContainer children with a `t-container`
  const menuContainer = menuWrapper.querySelector<HTMLDivElement>('.t-menu-base__maincontainer');
  const container = document.createElement('div');
  container.classList.add('t-container');
  while (menuContainer.firstChild) {
    container.appendChild(menuContainer.firstChild);
  }
  menuContainer.prepend(container);

  navHeader.classList.add('inited');

  // Calculate the dimensions and set the event handler to upadte it on windows resize
  updateNavMenuHeight(navMenu, menuBase, menuMobileBase);
  // JFC... (Is it required?)
  requestAnimationFrame(() => {
    updateNavMenuHeight(navMenu, menuBase, menuMobileBase);
  });
  // NOTE: Call it once!
  window.addEventListener('resize', () => {
    updateNavMenuHeight(navMenu, menuBase, menuMobileBase);
  });
}

export function initNavMenu() {
  // Must be visible for width > 960px ($mobileTreshold), may be switched off for dev time
  const navHeaderSelector = '.uc-NavHeader';
  const navHeader = document.querySelector<HTMLDivElement>(navHeaderSelector);
  if (!navHeader) {
    // eslint-disable-next-line no-console
    console.warn('[NavHeader:initNavMenu] Not found', navHeaderSelector);
    return;
  }
  const navMenuSelector = '.uc-NavMenu';
  const navMenu = document.querySelector<HTMLDivElement>(navMenuSelector);
  if (!navMenu) {
    // eslint-disable-next-line no-console
    console.warn('[NavMenu:initNavMenu] Not found', navMenuSelector);
    return;
  }

  // Ok, all nodes found...
  setupNodes(navHeader, navMenu);
}
