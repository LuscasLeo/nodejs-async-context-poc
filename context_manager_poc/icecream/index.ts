import { AsyncLocalStorage } from "node:async_hooks";

type IceCream = {
    flavor: string;
}

const icecreamContext = new AsyncLocalStorage<IceCream | undefined>();

export function getIcecreamContext(): IceCream {
    const icecream = icecreamContext.getStore();
    if (icecream === undefined) {
        throw new Error("No icecream context");
    }
    return icecream;
}

export function withIcecreamContext<T>(icecream: IceCream, fn: () => T): T {
    return icecreamContext.run(icecream, fn);
}

export function render() {
    const icecream = getIcecreamContext();
    return `I love ${icecream.flavor} icecream`;
}

export async function asyncRender() {
    return render();
}