export function initNavMenu() {
  const navMenuBlock = document.querySelector<HTMLDivElement>('.uc-NavMenu');
  if (!navMenuBlock) {
    return;
  }
  const navHeaderBlock = document.querySelector<HTMLDivElement>('.uc-NavHeader');
  if (!navHeaderBlock) {
    return;
  }
  console.log('[NavMenu]', {
    navMenuBlock,
    navHeaderBlock,
  });
  debugger;
}
