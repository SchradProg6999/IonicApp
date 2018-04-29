import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResultsPage } from '../results/results'
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public formData = {
    category: "",
    radiusModel: 5,
    diningType: {
      dineIn: false,
      takeOut: false,
      delivery: false
    },
    lat: 0,
    long: 0,
    offset: 0,
    limit: 6
  };

  constructor(private geolocation: Geolocation, public navCtrl: NavController) {

  }


  findRest(){
    this.navCtrl.push(ResultsPage, {formData: this.formData});
  }

  ionViewDidLoad(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.formData.lat = resp.coords.latitude;
      this.formData.long = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
