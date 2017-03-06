import { Injectable } from "@angular/core";

@Injectable()
export class UrlService {
  host: string = `http://localhost:3000`;

  regUrl = /\/$/;

  join(...url) {
    let host = this.host;
    url.unshift(this.host)
    return url.reduce((a,b) => this.addUrl(a,b));
  }

  addUrl(host: string, param: string) {
    if (this.regUrl.test(host[host.length - 1])) {
      if (this.regUrl.test(param[0])) {
        host += param[0].slice(1, param.length)
      } else {
        host += param
      }
    } else {
      if (this.regUrl.test(param[0])) {
        host += param
      } else {
        host += param[0].slice(1, param.length)
      }
    }

    return host;
  }
}
