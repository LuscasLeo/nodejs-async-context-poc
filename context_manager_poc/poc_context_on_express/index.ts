import express from "express";
import { render, withIcecreamContext } from "../icecream";

const app = express();

function expressIcecreamInjector(req: express.Request, res: express.Response, next: express.NextFunction) {
    const flavor = req.query.flavor as string | undefined;

    if (flavor === undefined) {
        res.status(400);
        return res.send("No flavor provided");
    }

    withIcecreamContext({
        flavor,
    }, () => {
        next();
    })

}

app.use(expressIcecreamInjector);

app.get("/", (req, res) => {
    return res.send(render());
});

export { app }