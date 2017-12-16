# QUB HTML Boilerplate

The boilerplate for HTML templates. 

### Requirements

*   [Node.js](http://nodejs.org): It's a kind of magic!

### Included

*   [Bootstrap 3](http://getbootstrap.com/): Questions?
*   [Webpack](https://webpack.js.org/): Babel for ES6 modules.
*   [Handlebars](http://handlebarsjs.com/): HTML partials.
*   [SVG sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/): Add your icons in `assets/icons` and use them.
*   [BrowserSync](https://www.browsersync.io/): Development server.
*	[gulp](https://gulpjs.com/): Just a gulp.

### How to start

1.  Make a coffee for Shaggy.
2.  Run: `npm i` to install the dependencies.
3.  Run: `gulp` to start coding.
4.  Make a coffee for yourself.
5.  Start coding!
6.  Run: `gulp build` to build.

### Test

For test your ~~bullshit~~ code:

Run: `gulp test` to start test.

### Deploy

You only need to deploy the server code and the public folder.


*
*
*
*
*
*
*
*
*

# Usage


The boilerplate uses webpack to concatinate and uglify the javascript code (instead of the gulp plugins). This allows better control over the generated code and removes the need to manually add links to the plugins in the required order.

#### JS usage:
**For example, to include slick:**

1.Install slick 
```
npm install --save slick-carousel
```
2.Create file 'slider.js' in `assets/js`
 
3.Import slick to this file 
```
import slick from 'slick-carousel';
$('#slider').slick({options});
```
5.At last include 'slider.js' file into 'main.js' by 
```
import './main';
```
6.Make a coffee and take a break.






#### Handlebars usage (HTML-include)

**RTFM**: http://handlebarsjs.com/

**For include partial html into another:**

```
{{>filename}}
``` 
or (if it has subfolder)
```
{{>modules/filename}}
```

**For include partial html with variables:**

You can include HTML with different content into another.

Icluded html:
```
<div class="card {{card_class}}">
    <div class="card__image" style="background-image: url({{card_image}});"></div>
    <h2>{{card_title}}</h2>
    <p>{{card_description}}</p>
</div>
```
Parent html:
```
{{>modules/card card_image="./images/image-3.gif" card_title="Card 4" card_description="This is card 4 description"}}

{{>modules/card card_class="card--long" card_image="./images/image-4.jpg" card_title="Card 5" card_description="This is card 5 description"}}
```

 




#### SVG usage if needed:
Icons are included via an svg sprite, to include and use an icon do the following:

1. Export the icon svg from Sketch/Illustrator. Make sure the path is outlined
2. Remove any `fill` or `fill-rule` from the svg file
3. Add the file to `assets/icons`
4. gulp will compress the svg and add it to `dist/images/icons.svg`
5. Use it as an svg symbol:

```
<svg aria-hidden="true" role="presentation" width='10' height='10'>
    <title>Description</title>
    <use xlink:href="/images/icons.svg#icon-name"></use>
</svg>
```

Note that accessibility tests will consider links as empty if they only have an svg. Add a visually hidden span with the text.



