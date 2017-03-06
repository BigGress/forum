import * as Router from "koa-router";
import { forums as db } from "../db/forum";

const router = new Router({
  prefix: "/forum"
});

router
  .get('/',async function (ctx, next) {
    let data = await db.fetch()
    this.body = {
      start: this.query.start || 0,
      results: data,
      toggle: data["length"],
    };
  })
  .post("/", async function(res, next) {
    this.body = await db.save(this.body).catch((err) => {
      this.error = err;
    });
  })
  .patch("/", "/:id", async function(res, next) {
    let form = await db.findByIdAndUpdate(this.params.id, this.body);
    this.body = await db.findById(this.params.id);
  })
  .delete("/", "/:id", async function(res, next) {
    let forum = await db.delete(this.params.id);
  })
  .get("/", "/:id", async function(res, next) {
  
    this.body = await db.findById(this.params.id);
  });

export const forums = router;