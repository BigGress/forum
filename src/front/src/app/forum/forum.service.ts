import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { UrlService } from "../service/url.service";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

let headers = new Headers({
  "Content-Type": "application/json"
})

@Injectable()
export class ForumService {
  constructor(
    private http: Http,
    private url: UrlService
  ) {}

  fetch() {
    console.log(this.url.join("/forum"));

    return this.http.get(this.url.join("/forum"), {
      headers
    })
    .map(res => res.json())
    .toPromise()
    .then(res => res.results)
    .catch(this.handleError)
  }

  handleError(error) {
    console.error(error)
  }
}
