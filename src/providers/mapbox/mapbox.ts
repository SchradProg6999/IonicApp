import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the MapboxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const url = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic";
const token = "pk.eyJ1IjoiamFzNjUzMSIsImEiOiJjamdwaTFyMWkybndjMzNzM2wzbmFhcWNvIn0.JCbPmN0u1ZChPt-koqZT5A";

@Injectable()
export class MapboxProvider {

  locationData = {
    lat: 0,
    long: 0
  };

  constructor(private geolocation: Geolocation, public http: HttpClient) {
    console.log('Hello MapboxProvider Provider');
  }


  getTravelInfo(resCoords, callback){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationData.lat = resp.coords.latitude;
      this.locationData.long = resp.coords.longitude;
      
      console.log(resCoords);
      this.http.get(
        url + "/" + this.locationData.long + "," + this.locationData.lat + ";" + resCoords.longitude + "," + resCoords.latitude,
        {
          params: {
            access_token: token
          }
        }
      ).subscribe(
        data => {
          callback(data);
        },
        error => {
          console.log("Some serious shit just went wrong");
        }
      );
    });
  }
}
