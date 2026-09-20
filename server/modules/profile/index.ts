import { Hono } from "hono";

const profileController = new Hono()

profileController.get("/me", (c) => {
    return c.json({ message: "Profile" });
})

export default profileController