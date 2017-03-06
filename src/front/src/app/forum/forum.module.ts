import { NgModule } from "@angular/core";
import { HttpModule } from '@angular/http';
import { MaterialModule } from "@angular/material";
import { CommonModule } from "../common.module";

import { ForumRouterModule } from "./forum.router";

import { ForumComponent } from "./list/list.component";

import { ForumService } from "./forum.service";

@NgModule({
  declarations: [
    ForumComponent,
  ],
  imports: [
    CommonModule,
    HttpModule,
    ForumRouterModule,
    MaterialModule,
  ],
  providers: [
    ForumService,
  ]
})
export class ForumModule {}
