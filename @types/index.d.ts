type EasingFunc = (k: number) => number;

export function start() : void;
export function tatween<T>(duration: number, easeing: EasingFunc, callback: (...objs: T) => void, ...objs: T) : number;

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