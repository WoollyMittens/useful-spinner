# spinner.js: Product spinner with inertia.

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

A touch controlled product spinner with inertia.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/spinner.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="js/spinner.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'js/spinner.js'
], function(Spinner) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {Spinner} from "js/spinner.js";
```

## How to start the script

```javascript
var spinner = new Spinner({
	'element': document.querySelector('.platform-spin'),
	'path': 'img/img_{i}.jpg',
	'min': 100,
	'max': 129,
	'rot': 0.93,
	'delta': -0.005,
	'attenuation': 1.05,
	'direction': 1
});
```

**'element' : {DOM node}** - The element to watch and/or affect.

**'path' : {string}** - Template for the image file names.

**'min' : {integer}** - Smaller index if the file names.

**'max' : {integer}** - Largest index of the file names.

**'rot' : {float}** - Starting rotation in radians.

**'delta' : {float}** - Rotation change per mouse/touch movement in radians.

**'attenuation' : {float}** - Brake force of mouse/touch interactions.

**'direction' : {integer}** - Modifier for the rotation direction.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).
