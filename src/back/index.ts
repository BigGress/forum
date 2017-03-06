import * as Koa from "koa";
import { createServer } from "http";
import * as bodyParser from "koa-bodyparser";
import * as cros from "koa2-cors";

import { forums } from "./router";

const app = new Koa();

app.use(cros())
   .use(bodyParser())
   .use(async function (ctx, next) {
     ctx.body = ctx.request.body;
     await next();
     ctx.response.headers
     if (ctx.request.method === "POST") {
       if (!ctx.body) {
        let response = ctx.response;
        response.status = 400;
        response.body = {
          message: ctx["error"],
        };
       }
     }
   })
  //  .use(async function(ctx, next) {
  //    await next();
  //    ctx.response
  //  })
   .use(forums.routes());

app.on("error", (err, ctx) => {
    console.error("err log",err, ctx)
})

createServer(app.callback()).listen(3000);