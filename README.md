[![NPM release](https://img.shields.io/npm/v/image-map.svg)](https://www.npmjs.com/package/image-map)
[![Build Status](https://travis-ci.org/clarketm/image-map.svg?branch=master)](https://travis-ci.org/clarketm/image-map)

# [Image-Map](https://www.travismclarke.com/imagemap/)

[![image-map](https://www.travismclarke.com/imagemap/image-map-yellow.png "image-map")](https://www.travismclarke.com/imagemap/)

A native JavaScript solution for creating responsive [image-maps](https://en.wikipedia.org/wiki/Image_map) that rerender on image or viewport changes.

### Check out the **[demo](https://www.travismclarke.com/imagemap/)**!

## Installation

### Install with npm
```shell
$ npm install image-map
```

### Install with bower
```shell
$ bower install image-map
```

### [CDN](https://unpkg.com/browse/image-map/dist/)
|                        Module (`.es.js`)                  |                        Main (`.js`)                    |                        Main (compressed) `.min.js`         |
| :-------------------------------------------------------: | :----------------------------------------------------: | :--------------------------------------------------------: |
| [🔗](https://unpkg.com/image-map/dist/image-map.es.js)    | [🔗](https://unpkg.com/image-map/dist/image-map.js)    | [🔗](https://unpkg.com/image-map/dist/image-map.min.js)    |

## Generating the image map `html`
You can generate image maps using this wonderful online tool: https://www.image-map.net/. It works for both local and web images.

## Usage
Add an **image-map** to your html page (either create one yourself or try the [online image map generator](https://www.image-map.net/)).
> An **image-map** is an image with clickable areas. The required `name` attribute of the `<map>` element is associated with the `<img>`'s `usemap` attribute and creates a relationship between the image and the map. The `<map>` element contains a number of `<area>` elements, that defines the clickable areas in the image map.

```html
<img usemap="#image-map" src="/path/to/image">

<map name="image-map">
      <area shape="poly" coords="22,22,231,22,264,82,232,143,22,143">
      <area shape="poly" coords="233,22,443,22,476,82,442,144,233,143,264,82">
      <area shape="poly" coords="445,22,654,22,686,81,654,143,444,143,475,82">
      <area shape="poly" coords="655,22,895,22,895,142,655,142,684,82">
</map>
```

### JavaScript

To use this plugin with *only* JavaScript, first include (or import) the `image-map.js` library:

```js
// using `import`
import ImageMap from "image-map";
```

```js
// using `require`
var ImageMap = require("image-map");
```

```html
<!-- using `script` -->
<script src="https://unpkg.com/image-map/dist/image-map.js"></script>
```

Next, simply call the `ImageMap` constructor:

```js
ImageMap('img[usemap]')
```

The default debounce rate is **500**ms. To customize this value, pass a numeric *wait* value as the second argument.

```js
ImageMap('img[usemap]', 500)
```

### jQuery

To use this plugin with jQuery, first include both the [jQuery](https://jquery.com/) and `image-map.jquery.js` libraries:

```html
<!-- using `script` -->
<script src="https://unpkg.com/jquery/dist/jquery.js"></script>
<script src="https://unpkg.com/image-map/dist/image-map.jquery.js"></script>
```

Next, simply call the `imageMap` plugin:

```js
$('img[usemap]').imageMap();
```

The default debounce rate is **500**ms. To customize this value, pass a numeric *wait* value as the first argument.
```js
$('img[usemap]').imageMap(500);
```
