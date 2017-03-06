import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "json"
})
export class JsonPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      console.log(value);

      return JSON.stringify(value);
    } else {
      return "";
    }
  }
}
