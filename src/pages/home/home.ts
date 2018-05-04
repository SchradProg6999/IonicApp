import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ResultsPage } from '../results/results'
import { SurprisePage } from '../surprise/surprise';
import { YelpServiceProvider } from '../../providers/yelp-service/yelp-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public categories;

  public formData = {
    category: "",
    radiusModel: 5,
    diningType: {
      dineIn: false,
      takeOut: false,
      delivery: false
    }
  };

  constructor(public yelpServiceProvider: YelpServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.categories = yelpServiceProvider.getAllCategories();
    console.log(this.categories);
  }


  findRest(){
    this.navCtrl.push(ResultsPage, {formData: this.formData});
  }

  ionViewDidLoad(){
    
  }
}
