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
    console.log('CatalogIndex:itemClick', {
      nodeTagName,
      newEvent,
      linkNode,
      // currentNode,
      // link,
      node,
      ev,
    });
    linkNode.dispatchEvent(newEvent);
  }
}

function initCatalogItem(node: HTMLElement) {
  const link = node.querySelector('a');
  if (link) {
    const itemClickBound = itemClick.bind(null, link);
    node.addEventListener('click', itemClickBound);
    node.classList.add('has-link');
  }
}

export function initCatalogIndex() {
  const nodeRoot = document.querySelector('.uc-CatalogIndex'); // , .uc-StoreGrid .js-store-grid-cont
  if (!nodeRoot) {
    return;
  }
  const items = nodeRoot.querySelectorAll('.t-item, .t-store__card');
  if (items.length) {
    items.forEach(initCatalogItem);
  }
  const observer = new MutationObserver((mutations) => {
    // console.log('[CatalogIndex:mutations]', { mutations });
    mutations.forEach((mutation) => {
      const { type, addedNodes } = mutation;
      if (type === 'childList' && addedNodes.length) {
        addedNodes.forEach(initCatalogItem);
      }
    });
  });
  observer.observe(nodeRoot, {
    childList: true,
  });
}
