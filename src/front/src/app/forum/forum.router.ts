import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ForumComponent } from "./list/list.component";

export let router = RouterModule.forChild([{
  path: "forum",
  component: ForumComponent
}])


@NgModule({
  imports: [
    router
  ],
  exports: [
    RouterModule
  ]
})
export class ForumRouterModule {}
