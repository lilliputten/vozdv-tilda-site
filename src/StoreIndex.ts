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

function initCatalogItem(isIndex: boolean, node: HTMLElement) {
  if (node.classList.contains('inited')) {
    return;
  }
  const link = node.querySelector('a');
  if (link) {
    const itemClickBound = itemClick.bind(null, link);
    node.addEventListener('click', itemClickBound);
    node.classList.add('has-link');
    // Append buttons to the StoreIndex items
    if (isIndex) {
      const wrapper = node.querySelector('.t1095__textwrapper');
      if (wrapper) {
        const actionsNode = document.querySelector('.uc-StoreIndexActions'); // ?.cloneNode(true) as Element; // Clone to debug original node
        if (actionsNode) {
          actionsNode.classList.add('Buttons', 'Actions');
          wrapper.append(actionsNode.cloneNode(true));
        }
      }
    }
  }
  node.classList.add('inited');
}

export function initStoreIndexWrapper(nodeRoot: Element) {
  const isIndex = nodeRoot.classList.contains('uc-StoreIndex');
  const initCb = initCatalogItem.bind(undefined, isIndex);
  const items = nodeRoot.querySelectorAll('.t-item'); // , .t-store__card');
  if (items.length) {
    items.forEach(initCb);
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
        nodes.forEach(initCb);
      }
    });
  });
  observer.observe(nodeRoot, {
    childList: true,
  });
}

export function initStoreIndex() {
  const nodeRoots = document.querySelectorAll('.uc-StoreIndex, .uc-StoreGrid .js-store-grid-cont');
  nodeRoots.forEach(initStoreIndexWrapper);
}
