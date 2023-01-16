import assert from "node:assert";
import { AsyncLocalStorage } from "node:async_hooks";
import { test, describe } from "@jest/globals";
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

function withIcecreamContext<T>(icecream: IceCream, fn: () => T): T {
    return icecreamContext.run(icecream, fn);
}

function render() {
    const icecream = getIcecreamContext();
    return `I love ${icecream.flavor} icecream`;
}

async function asyncRender() {
    return render();
}

describe("using icecream context", () => {

    test("rendering icecream", () => {
        withIcecreamContext({ flavor: "chocolate" }, () => {
            assert.strictEqual(render(), "I love chocolate icecream");
        });
    });

    test("thorw error when no icecream context", () => {
        assert.throws(() => {
            render();
        }, {
            name: "Error",
            message: "No icecream context",
        });
    });

    test("rendering icecream with nested context", () => {

        withIcecreamContext({ flavor: "chocolate" }, () => {
            withIcecreamContext({ flavor: "vanilla" }, () => {
                assert.strictEqual(render(), "I love vanilla icecream");
            });
        });


    });

    test("context Wrapper returns function return value", () => {

        const result = withIcecreamContext({ flavor: "chocolate" }, () => {
            return render();
        });


        assert.strictEqual(result, "I love chocolate icecream");
    });

    test("Context wrapper returns promise when function returns promise", async () => {

        const result = withIcecreamContext({ flavor: "chocolate" }, async () => {
            return await asyncRender();
        });

        assert(result instanceof Promise);

        assert.strictEqual(await result, "I love chocolate icecream");
    });
})