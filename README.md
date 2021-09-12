# tatween

`tatween` is JavaScript animation library providing Cocoa-like Animation block.  

It was made possible thanks to [ES6-Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).  
I started to wrote this library as a Proof of Concept for the default Animation library for [nidium project](https://github.com/nidium/Nidium)

## Block-Based Animations

Animations block are a way to express animations in a declarative way. They are used in the [Apple cocoa framework](https://developer.apple.com/library/content/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/AnimatingViews/AnimatingViews.html) 


## Examples 

```javascript
var square = document.getElementById("my_div").style;

// The code inside the block only run once.
// Here `square` in the original one wrapped by a Proxy
tatween(1000, Easing.Bounce.Out, (square /* Proxy wrapped element */) => {
    /*
        This block define the "end values".
        tatween will tween them from their initial values to the end values described here
    */

    /* Set the end value for top and width. */
    square.top = "0px";
    square.width = "150px";

    /*
        Add 200 to the initial left value.
        Here, it's the same than doing `square.left = "250px"`
    */
    square.left += 200;

}, square /* original element */);
 ```
 
 ![Example 1](https://github.com/paraboul/tatween/blob/master/gifs/example1.gif?raw=true)
 
 Swap the position of two elements. Just swap their left properties.
 ```javascript
 tatween(3000, Easing.Elastic.Out, (square_one, square_two) => {

    // Swap the left of the two element using destructuring array.
    [square_one.left, square_two.left] = [square_two.left, square_one.left]

}, square_one, square_two); // Give any number of elements
```

 ![Example 2](https://github.com/paraboul/tatween/blob/master/gifs/swap.gif?raw=true)
 
## Online demos

- [Multiple elements / canvas](http://p.nf/between/multiple_elements.html)


## Download

[tatween.js](https://raw.githubusercontent.com/paraboul/tatween/master/dist/tatween.js)

## Usage

import tatween.js:

```javascript
import { tatween, Easing } from 'tatween'
```

Animate any property (really anything as long as it's backed by a number)

```javascript
tatween(1000 /* duration in ms */, Easing.Bounce.Out /* Easing function */, (obj) => {
    // Animate anything in `obj`
}, obj);
```

Available Easing function :

```
Linear.None

Quadratic.In
Quadratic.Out
Quadratic.InOut

Cubic.In
Cubic.Out
Cubic.InOut

Quartic.In
Quartic.Out
Quartic.InOut

Quintic.In
Quintic.Out
Quintic.InOut

Sinusoidal.In
Sinusoidal.Out
Sinusoidal.InOut

Exponential.In
Exponential.Out
Exponential.InOut

Circular.In
Circular.Out
Circular.InOut

Elastic.In
Elastic.Out
Elastic.InOut

Back.In
Back.Out
Back.InOut

Bounce.In
Bounce.Out
Bounce.InOut
```

## License

Copyright 2021 Anthony Catel. All rights reserved. Use of this source code is governed by a MIT license that can be found in the LICENSE file.
