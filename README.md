[![Build Status](https://travis-ci.org/clarketm/image-map.svg?branch=master)](https://travis-ci.org/clarketm/image-map)

# [Image-Map](https://www.travismclarke.com/imagemap/) 

![image-map](https://www.travismclarke.com/imagemap/image-map-yellow.png "image-map")

A native JavaScript solution for creating responsive [image-maps](https://en.wikipedia.org/wiki/Image_map) that rerender on image or viewport changes.

### Check out the **[demo](https://www.travismclarke.com/imagemap/)**! 

### Install with npm
```shell
$ npm install image-map
```

### Install with bower
```shell
$ bower install image-map
```


## Usage
Add an **image-map** to your html page. 
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

### jQuery
To use this plugin with jQuery, include both the [jQuery](https://jquery.com/) and `image-map.js` scripts, then simply call:
```js
$('img[usemap]').imageMap();
```

### JavaScript (Vanilla JS)
To use this plugin with *only* JavaScript, include the `image-map.js` script, then simply call:
```js
ImageMap('img[usemap]')
```
