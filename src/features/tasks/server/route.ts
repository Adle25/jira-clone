import { Hono } from "hono";

const app = new Hono()
    .post(
        "/"
    )

export default app;