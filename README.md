# spinner.js: Product spinner with inertia.

A touch controlled product spinner with inertia.

Try the <a href="http://www.woollymittens.nl/default.php?url=useful-spinner">demo</a>.

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

Or import into an MVC framework.

```js
var Spinner = require('js/spinner.js');
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

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp dist` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8500/.
+ `gulp php` - Serves the project on a temporary php server at http://localhost:8500/.

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
