import { Router } from "../deps.ts";
import { createColor} from "../handlers/color.ts";
import { colors } from "../handlers/color.ts";

export const routerColor = new Router()

routerColor
.get("/", (ctx) => {
  ctx.render("colorForm.ejs", { colors });
})
.post("/", createColor);