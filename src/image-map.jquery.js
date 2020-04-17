import $ from "jquery";
import ImageMap from "./image-map";

if ($ !== undefined && $.fn) {
  $.fn.imageMap = function(wait) {
    return new ImageMap(this.toArray(), wait);
  };
}
