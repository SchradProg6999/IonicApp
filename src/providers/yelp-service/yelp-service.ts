import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const key = "6wHr6QAgg8jIQYgePfDLz74iLM3MV4swv-J5FQZxMNueFTXIBE6cVEue2EOABI4jCS0vHzmKp_Yw3ZldPa0KTKtlLKbT5o0GCkUucDXgTHBcoa-6I2p5NHo6gk3lWnYx";
const url = "http://ganskop.com/proxy/https://api.yelp.com/v3";
/*
  Generated class for the YelpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YelpServiceProvider {

  public headers = new HttpHeaders({
      "Authorization":"Bearer " + key
    });

  constructor(public http: HttpClient) {

  }

  getRestaurantList(formData): Observable<any>{
    formData.radius = parseInt(formData.radius) * 1609;
    console.log(formData.radius);
    return this.http.get(
      url + "/businesses/search",
      {
        params: {
          categories: "hotdogs",
          latitude: "43.071840",
          longitude: "-77.625019",
          radius: "10000",
          offset: "0",
          open_now: "false"
        },
        headers: this.headers
      }
    );
  }
}
