import { Router } from "../deps.ts";

export const routerColor = new Router()

const colors = [];

routerColor

.get("/", (ctx) => {
  ctx.render("colorForm.ejs", { colors });
})

.post("/", async (ctx) => {
  const body = ctx.request.body({ type: "form" });
  const value = body.value;
  const color = (await value).get("color");
  colors.push(color);
  ctx.response.redirect("/");
});