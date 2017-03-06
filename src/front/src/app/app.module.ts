import { NgModule } from "@angular/core";
import { MaterialModule } from "@angular/material";
import { CommonModule } from "./common.module";

import { ServiceModule } from "./service/service.module";

import { AppComponent } from './app.component';
import { AppRouterModule } from "./app.router";

import { ForumModule } from "./forum/forum.module";

import { JsonPipe } from "./pipe/json.pipe";

@NgModule({
  declarations: [
    AppComponent,
    JsonPipe,
  ],
  imports: [
    CommonModule,
    AppRouterModule,
    ForumModule,
    ServiceModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
