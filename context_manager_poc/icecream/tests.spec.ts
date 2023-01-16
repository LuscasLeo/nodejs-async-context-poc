import { describe, test } from "@jest/globals";
import assert from "node:assert";
import { asyncRender, render, withIcecreamContext } from ".";




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