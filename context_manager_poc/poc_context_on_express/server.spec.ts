import { describe, test, expect } from "@jest/globals";
import request from "supertest";
import { app } from ".";

describe("server", () => {

    test("server responds with icecream", async () => {
        const response = await request(app)
            .get("/?flavor=chocolate");
        expect(response.status).toBe(200);
        expect(response.text).toBe("I love chocolate icecream");
    });

    test("server responds with error when no flavor is provided", async () => {
        const response = await request(app)
            .get("/");
        expect(response.status).toBe(400);
        expect(response.text).toBe("No flavor provided");
    });

});