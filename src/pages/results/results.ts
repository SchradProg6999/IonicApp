import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YelpServiceProvider } from '../../providers/yelp-service/yelp-service'

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  public formData;
  public curRes;

  constructor(public yelpService: YelpServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.formData = navParams.get("formData");
    yelpService.getRestaurantList(this.formData).subscribe(
      data => {
        let rand = Math.floor(Math.random() * 20);
        this.curRes = data.businesses[rand];
      },
      errors => {
        console.log("Didnt work you fuck");
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }
}
