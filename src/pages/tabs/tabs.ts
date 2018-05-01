import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { DetailsPage } from '../details/details';
import { SurprisePage } from '../surprise/surprise';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SurprisePage;

  private locationData = {
    lat: 0,
    long: 0
  };

  constructor(private geolocation: Geolocation, params: NavParams) {
    this.getLocation();
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationData.lat = resp.coords.latitude;
      this.locationData.long = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
