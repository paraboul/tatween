type EasingFunc = (k: number) => number;

type animationBlock<T> = (...objs: T) => animationBlock<T> | void

export function start() : void;
export function tatween<T>(duration: number, easeing: EasingFunc, callback: animationBlock<T>, ...objs: T) : (complete: () => void) => void;

interface Ops {
    In: EasingFunc
    Out: EasingFunc
    InOut: EasingFunc
}

type EaseInterface = {
    Linear: {
        None: EasingFunc
    },

    Quadratic: Ops
    Cubic: Ops
    Quartic: Ops
    Quintic: Ops
    Sinusoidal: Ops
    Exponential: Ops
    Circular: Ops
    Elastic: Ops
    Back: Ops
    Bounce: Ops
}

export const Easing : EaseInterface;