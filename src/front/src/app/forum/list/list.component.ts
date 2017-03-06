import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import { ForumService } from "../forum.service";

@Component({
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ForumComponent implements OnInit {
  forums: any;

  constructor(
    private http: Http,
    private service: ForumService
  ) {}

  ngOnInit() {
    this.getForums();
  }

  getForums() {
    this.forums = this.service.fetch();
  }

  get(item) {
    console.log(item);

  }
}
