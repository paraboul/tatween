const AnimationsList = new Set();

let isRunning = false;
const canRun = typeof window !== 'undefined';

function draw() {
    const curDate = +new Date();

    for (let anim of AnimationsList) {
        const { end, start, ease, list, duration } = anim;
        const e = ease((curDate - start) / (end - start));
        const finish = (curDate > end);

        for (let elem of list) {
            const { target, property, endValue, startValue, isPx } = elem;
            let targetProperty = finish
                                    ? endValue
                                    : startValue + ((endValue - startValue) * e);

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

    if (AnimationsList.size) {
        window.requestAnimationFrame(draw);
        isRunning = true;

        return;
    }

    isRunning = false;
}

export function tatween(duration, ease, callback, ...objs)
{
    const proxies = [];
    const anim = {
        duration,
        ease,
        objs,
        finish: () => {},
    };

    AnimationsList.add(anim);

    if (!isRunning && canRun) {
        window.requestAnimationFrame(draw);
        isRunning = true;
    }

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
                    endValue: parseFloat(value),
                    isPx
                })
                
                return true;
            },

            get: (target, prop, rcv) => {
                return parseFloat(target[prop]);
            }
        });

        proxies.push(proxy);
    }

    (anim.redo = function(callback) {
        var start = +new Date();
        
        // Reset some state since we're using the same object when chaining
        Object.assign(anim, {start, end: start+duration, list: [], next: null});

        // check whether we have a chained animation
        let next = callback(...proxies);
        if (typeof next == 'function') {
            anim.next = next;
        }

    })(callback);

    return function(animationFinished) {
        anim.finish = animationFinished;
    }
}
