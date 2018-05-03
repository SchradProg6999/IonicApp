import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';

const key = "6wHr6QAgg8jIQYgePfDLz74iLM3MV4swv-J5FQZxMNueFTXIBE6cVEue2EOABI4jCS0vHzmKp_Yw3ZldPa0KTKtlLKbT5o0GCkUucDXgTHBcoa-6I2p5NHo6gk3lWnYx";
const url = "http://ganskop.com/proxy/https://api.yelp.com/v3";
const initLimit = 20;
const limit = 10;
const initOffset = 0;

/*
  Generated class for the YelpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YelpServiceProvider {

  private formData;
  private numReq = 0;

  locationData = {
    lat: 0,
    long: 0
  }

  public headers = new HttpHeaders({
      "Authorization":"Bearer " + key
    });

  constructor(private geolocation: Geolocation, public http: HttpClient) {
  }

  getRestaurantList(callback, formData?){
    if(formData != undefined){
      this.formData = formData;
      this.formData["limit"] = initLimit;
      this.formData["offset"] = initOffset;
      this.numReq = 0;
    }
    else{
      this.formData["limit"] = limit;
      this.formData["offset"] = initLimit + (this.numReq * limit);
      this.numReq++;
    }

    if(this.formData == undefined){
      callback(undefined);
    }

    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationData.lat = resp.coords.latitude;
      this.locationData.long = resp.coords.longitude;
      let radius = 0;
      radius = parseInt(this.formData.radiusModel) * 1609;
      this.http.get(
        url + "/businesses/search",
        {
          params: {
            categories: this.formData.category,
            radius: String(radius),
            offset: this.formData.offset,
            open_now: "true",
            limit: this.formData.limit,
            latitude: String(this.locationData.lat),
            longitude: String(this.locationData.long)
          },
          headers: this.headers
        }
      ).subscribe(
        data => {
          callback(data);
        },
        errors => {
          callback(undefined);
        }
      );
     }).catch((error) => {
       console.log('Error getting location', error);
     });
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
