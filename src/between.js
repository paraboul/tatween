const Easing = require("./easing");

var AnimationsList = new Set();

{
    let draw = function() {
        var curDate = +new Date();

        for (let anim of AnimationsList) {
            let { end, start, ease, list, duration } = anim;
            let e = ease((curDate - start) / (end - start));
            let finish = (curDate > end);

            for (let elem of list) {
                let { target, property, value, startValue, isPx } = elem;
                let targetProperty = finish
                                     ? value
                                     : startValue + ((value - startValue) * e);

                if (isPx) {
                    targetProperty += "px";
                }

                target[property] = targetProperty;
            }

            if (finish) {
                if (anim.next) {
                    anim.redo(anim.next);
                } else {
                    anim.finish();
                    AnimationsList.delete(anim);
                }
            }
        }

        window.requestAnimationFrame(draw);
    }

    draw();
}

var Between = function(duration, ease, callback, ...objs)
{
    var proxies = [];
    var anim = {
        duration,
        ease,
        objs,
        finish: function(){},
    };

    AnimationsList.add(anim);

    for (let obj of objs) {
        let proxy = new Proxy(obj, {
            set: (target, property, value, rcv) => {
                if (!(property in target)) {
                    return true;
                }

                let targetProperty = target[property];

                // Check whether we need to append "px" to the animated property
                let isPx = /[0-9]+px/.test(targetProperty);

                anim.list.push({
                    startValue: parseFloat(targetProperty),
                    target,
                    property,
                    value: parseFloat(value),
                    isPx
                })
                
                return true;
            },

            get: (target, prop, rcv) => {
                return target[prop];
            }
        });

        proxies.push(proxy);
    }

    (anim.redo = function(callback) {
        var start = +new Date();
        
        // Reset some state since we're using the same object when chaining
        Object.assign(anim, {start, end: start+duration, list: [], next: null});

        // heck whether we have a chained animation
        let next = callback(...proxies);
        if (typeof next == 'function') {
            anim.next = next;
        }

    })(callback);

    return function(animationFinished) {
        anim.finish = animationFinished;
    }
}

module.exports = {
    block: Between,
    easing: Easing
}