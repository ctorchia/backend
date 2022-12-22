// import { Application, config } from "./deps.ts";
import { Application, viewEngine, ejsEngine, oakAdapter, config } from './deps.ts'
import { logger } from "./logger/logger.ts";
import { routerUser } from "./routes/user.routes.ts";
import { routerColor } from "./routes/color.routes.ts";

const configData = await config()
const PORT = configData['PORT'] || 8000

const app = new Application();

app.use(
    viewEngine(oakAdapter, ejsEngine, {
        viewRoot: "./views",
    })
);

app.use(logger)
app.use(routerUser.routes())
app.use(routerColor.routes())

console.log(`Escuchando en el puerto ${PORT}`)
await app.listen({ port: Number(PORT) })




// import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// import {
//   viewEngine,
//   ejsEngine,
//   oakAdapter,
// } from "https://deno.land/x/view_engine@v10.5.1/mod.ts";

// const router = new Router();
// const colors = [];

// const app = new Application();

// app.use(
//   viewEngine(oakAdapter, ejsEngine, {
//     viewRoot: "./views",
//   })
// );

// router
//   .post("/", async (ctx) => {
//     const body = ctx.request.body({ type: "form" });
//     const value = body.value;
//     const color = (await value).get("color");
//     colors.push(color);
//     ctx.response.redirect("/");
//     console.log(color)
//   })
//   .get("/", (ctx) => {
//     ctx.render("form.ejs", { colors });
//   });

// app.use(router.routes());
app.use(router.allowedMethods());

// await app.listen({ port: 8000 });