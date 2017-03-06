import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// import {  } from "./forum/list/list.component";
import { AppComponent } from "./app.component";
import { ForumComponent } from "./forum/list/list.component";

export let router = RouterModule.forRoot([

])

@NgModule({
  imports: [
    router
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {}
