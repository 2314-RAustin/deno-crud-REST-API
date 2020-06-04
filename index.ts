import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/index.routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods()); //Con allowedMethods podremos hacer peticiones REST con deno

console.log("Server runing on port 3000");
await app.listen({ port: 3000 });