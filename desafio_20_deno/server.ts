// import { Application, config } from "./deps.ts";
import { Application, viewEngine, ejsEngine, oakAdapter, config } from './deps.ts'
import { logger } from "./logger/logger.ts";
import { routerUser } from "./routes/user.routes.ts";

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

console.log(`Escuchando en el puerto ${PORT}`)
await app.listen({ port: Number(PORT) })