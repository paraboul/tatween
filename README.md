# Between

`Between` is JavaScript animation library providing Cocoa-like Animation block.  

It was made possible thanks to [ES6-Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## Block-Based Animations

Animations block are a way to express animations in a declarative way. They are used in the [Apple cocoa framework](https://developer.apple.com/library/content/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/AnimatingViews/AnimatingViews.html) 


## Examples 

```javascript
Between.block(1000, Between.easing.Bounce.Out, (square) => {
    /*
        This block define the "end values".
        The animation will tween from their initial values to the end values described here
    */

    /* Set the end value for top and width. */
    square.top = "0px";
    square.width = "150px";

    /*
        Add 200 to the initial left value.
        Here, it's the same than doing `square.left = "250px"`
    */
    square.left += 200;

}, square);



 ```
 
 Animate-swap the position of two elements. Just swap their left values.
 ```javascript
 Between.block(3000, Between.easing.Elastic.Out, (square_one, square_two) => {

    // Swap the left of the two element using destructuring array.
    [square_one.left, square_two.left] = [square_two.left, square_one.left]

}, square_one, square_two); // Give any number of elements
```