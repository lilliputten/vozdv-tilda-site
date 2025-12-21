function initHeroCover(carrier: HTMLDivElement) {
  const { dataset } = carrier;
  const backgroundImage = carrier.style.backgroundImage; // Current background image
  const { contentCoverBg } = dataset;
  const bgUrlStr = contentCoverBg && `url("${contentCoverBg}")`;
  // Restore the original background image
  if (bgUrlStr && bgUrlStr !== backgroundImage) {
    requestAnimationFrame(() => {
      carrier.style.backgroundImage = bgUrlStr;
      carrier.classList.add('cover-inited');
    });
  }
}
function checkMutation(mutation: MutationRecord) {
  if (mutation.type === 'attributes') {
    const { attributeName, target } = mutation;
    const carrier = target as HTMLDivElement;
    // TODO: Also check the `style` attribute?
    if (attributeName === 'class' && carrier.classList.contains('loaded')) {
      initHeroCover(carrier);
      return true;
    }
  }
}

function initCarrierAndDoves(hero: HTMLDivElement, doveLeft: HTMLImageElement) {
  const carrier = hero.querySelector<HTMLDivElement>('.t-cover__carrier');
  // Check if cover loaded and init cover
  if (carrier.classList.contains('loaded')) {
    initHeroCover(carrier);
  } else {
    carrier.classList.toggle('loaded', true);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (checkMutation(mutation)) {
          // observer.disconnect(); // NOTE: Don't remove observer
        }
      });
    });
    observer.observe(carrier, { attributes: true });
  }
  initHeroCover(carrier);
  // Init doves
  const left1 = doveLeft.cloneNode() as HTMLDivElement; // document.createElement('div');
  const left2 = left1.cloneNode() as HTMLDivElement; // document.createElement('div');
  const right = left1.cloneNode() as HTMLDivElement; // Using the same image (in the cloned node)
  // Adding...
  left1.classList.add('dove', 'dove-left1');
  carrier.append(left1);
  left2.classList.add('dove', 'dove-left2');
  carrier.append(left2);
  right.classList.add('dove', 'dove-right');
  carrier.append(right);
  // Animate appearance...
  requestAnimationFrame(() => {
    left1.classList.add('ready');
    left2.classList.add('ready');
    right.classList.add('ready');
  });
}

export function initHero() {
  const heroSelector = '.uc-Hero';
  const hero = document.querySelector<HTMLDivElement>(heroSelector);
  if (!hero) {
    // eslint-disable-next-line no-console
    console.warn('[Hero] Not found', heroSelector);
    return;
  }

  const doveLeft = document.querySelector<HTMLImageElement>('.uc-dove-left .t-img');
  if (!doveLeft) {
    // eslint-disable-next-line no-console
    console.warn('[Hero] Dove image not found', {
      doveLeft,
    });
    return;
  }

  initCarrierAndDoves(hero, doveLeft);
}
