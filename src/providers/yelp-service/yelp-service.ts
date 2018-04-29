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

  private formData;

  public headers = new HttpHeaders({
      "Authorization":"Bearer " + key
    });

  constructor(public http: HttpClient) {

  }

  getRestaurantList(formData?): Observable<any>{
    if(formData != undefined){
      this.formData = formData;
    }

    if(this.formData == undefined){
      return undefined;
    }

    let radius = 0;
    radius = parseInt(this.formData.radiusModel) * 1609;
    console.log(this.formData);
    return this.http.get(
      url + "/businesses/search",
      {
        params: {
          categories: this.formData.category,
          radius: String(radius),
          offset: this.formData.offset,
          open_now: "true",
          limit: this.formData.limit,
          latitude: this.formData.lat,
          longitude: this.formData.long
        },
        headers: this.headers
      }
    );
  }

  getRestaurantDetails(id): Observable<any>{
    return this.http.get(
      url + "/businesses/" + id,
      {
        headers: this.headers
      }
    );
  }
}
