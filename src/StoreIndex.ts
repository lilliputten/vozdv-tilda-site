function itemClick(linkNode: HTMLElement, ev: MouseEvent) {
  // DEBUG: To check mobile devices' behavior
  const node = ev.target as HTMLElement;
  const nodeTagName = node.tagName;
  if (nodeTagName !== 'A') {
    ev.stopPropagation();
    ev.preventDefault();
    // const link = node.querySelector('a');
    // const currentNode = ev.currentTarget as HTMLElement;
    const newEvent = new MouseEvent(ev.type, ev);
    /* console.log('StoreIndex:itemClick', {
     *   nodeTagName,
     *   newEvent,
     *   linkNode,
     *   // currentNode,
     *   // link,
     *   node,
     *   ev,
     * });
     */
    linkNode.dispatchEvent(newEvent);
  }
}

function initCatalogItem(node: HTMLElement) {
  if (node.classList.contains('inited')) {
    return;
  }
  const link = node.querySelector('a');
  if (link) {
    const itemClickBound = itemClick.bind(null, link);
    node.addEventListener('click', itemClickBound);
    node.classList.add('has-link');
  }
  node.classList.add('inited');
}

export function initStoreIndex() {
  const nodeRoot = document.querySelector('.uc-StoreIndex, .uc-StoreGrid .js-store-grid-cont');
  if (!nodeRoot) {
    // eslint-disable-next-line no-console
    console.warn('[StoreIndex] Not found catalogue root');
    return;
  }
  const items = nodeRoot.querySelectorAll('.t-item'); // , .t-store__card');
  if (items.length) {
    items.forEach(initCatalogItem);
  }
  const observer = new MutationObserver((mutations) => {
    // console.log('[StoreIndex:mutations]', { mutations });
    mutations.forEach((mutation) => {
      const { type, addedNodes } = mutation;
      if (type === 'childList' && addedNodes.length) {
        const nodes = Array.from(addedNodes).flatMap((node: HTMLElement) => {
          if (node.classList.contains('t-item')) {
            return node;
          }
          return Array.from(node.querySelectorAll('.t-item'));
        });
        nodes.forEach(initCatalogItem);
      }
    });
  });
  observer.observe(nodeRoot, {
    childList: true,
  });
}
