function initArticlesPreviewItem(node: HTMLDivElement) {
  const img = node.querySelector<HTMLImageElement>(':scope > img');
  const div = node.querySelector<HTMLDivElement>(':scope > div');
  if (!img || !div) {
    return;
  }
  const { dataset } = img;
  const { original } = dataset;
  const imgSrc = img.getAttribute('src');
  const src = original || imgSrc;
  const isEmpty = src.includes('/empty/');
  if (!isEmpty) {
    const divBg = document.createElement('div');
    divBg.classList.add('bg');
    divBg.style.backgroundImage = `url("${src}")`;
    div.prepend(divBg);
    const divGr = document.createElement('div');
    divGr.classList.add('gr');
    divBg.prepend(divGr);
    // Remove image
    img.remove();
  }
}

export function initArticlesPreview() {
  const ArticlesPreviewBlock = document.querySelector<HTMLDivElement>('.uc-ArticlesPreview');
  if (!ArticlesPreviewBlock) {
    return;
  }
  const cards = ArticlesPreviewBlock.querySelectorAll<HTMLDivElement>('.t-card__col');
  cards.forEach(initArticlesPreviewItem);
  /* // NOTE: Using mutations...
   * cards.forEach((node: HTMLDivElement) => {
   *   const img = node.querySelector<HTMLImageElement>(':scope > img');
   *   if (!img) {
   *     return;
   *   }
   *   initArticlesPreviewItem(node);
   *   const observer = new MutationObserver((mutations) => {
   *     mutations.forEach((mutation) => {
   *       if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
   *         // initArticlesPreviewItem(node);
   *         // img.style.display = 'none';
   *         // observer.disconnect();
   *       }
   *     });
   *   });
   *   observer.observe(img, { attributes: true });
   * });
   */
}
