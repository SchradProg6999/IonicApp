import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ResultsPage } from '../results/results'
import { SurprisePage } from '../surprise/surprise';


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
    }
  };

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams) {

  }


  findRest(){
    this.navCtrl.push(ResultsPage, {formData: this.formData});
  }

  ionViewDidLoad(){

  }
}
