import { Component } from '@angular/core';
import { Http, Response } from "@angular/http";

import "rxjs/add/operator/map";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private http: Http
  ) {}

  getData() {
    this.http.get("http://localhost:3000/forum")
        .map(res => res.json())
        .subscribe((res) => {
          console.log(res);

        })
  }
}
