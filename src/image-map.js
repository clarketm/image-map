import { version } from "../package.json";

const RESIZE = "resize";
const LOAD = "load";
const USEMAP = "usemap";
const COORDS = "coords";
const COMPLETE = "complete";

/**
 * ImageMap main library constructor
 *
 * @param selector {string} CSS selector
 * @param wait {number} [wait=500] debounce wait interval
 * @constructor
 */
class ImageMap {
  constructor(selector, wait) {
    this.selector = selector instanceof Array ? selector : document.querySelectorAll(selector);
    if (document.readyState !== COMPLETE) window.addEventListener(LOAD, this.update.bind(this));
    else this.update();
    window.addEventListener(RESIZE, this.debounce(this.update, wait).bind(this));
  }

  static genAreaSelector(mapName) {
    return `map[name="${mapName}"] area`;
  }

  /**
   * Update
   */
  update() {
    const imgs = this.selector;

    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];

      if (img.getAttribute(USEMAP) === undefined) return;
      const newImg = img.cloneNode();
      newImg.addEventListener(LOAD, this.handleImageLoad(img.offsetWidth, img.offsetHeight));
      newImg.src = img.src; // required for IE
    }
  }

  /**
   * Debounce
   *
   * @param {function} func
   * @param {number} [wait=500]
   */
  debounce(func, wait = 500) {
    let timeout;
    return (...args) => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(ctx => func.apply(ctx, args), wait, this);
    };
  }

  /**
   * handleImageLoad
   *
   * @param {number} [offsetWidth=0]
   * @param {number} [offsetHeight=0]
   */
  handleImageLoad(offsetWidth = 0, offsetHeight = 0) {
    return e => {
      const w = e.target.width;
      const h = e.target.height;
      const wPercent = offsetWidth / 100;
      const hPercent = offsetHeight / 100;
      const mapName = e.target.getAttribute(USEMAP).replace(/^#/, "");

      const areas = document.querySelectorAll(ImageMap.genAreaSelector(mapName));
      for (let i = 0; i < areas.length; i++) {
        const area = areas[i];

        const coordsString = (area.dataset[COORDS] = area.dataset[COORDS] || area.getAttribute(COORDS));
        const coordsArrayOld = coordsString.split(",");
        const coordsArrayNew = coordsArrayOld.map((_, i) =>
          i % 2 === 0 ? Number((coordsArrayOld[i] / w) * 100 * wPercent) : Number((coordsArrayOld[i] / h) * 100 * hPercent)
        );
        area.setAttribute(COORDS, coordsArrayNew.toString());
      }
    };
  }
}

function _ImageMap(selector, wait) {
  return new ImageMap(selector, wait);
}

_ImageMap.VERSION = version;

export default _ImageMap;
