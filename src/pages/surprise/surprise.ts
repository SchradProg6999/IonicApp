import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResultsPage } from '../results/results';

/**
 * Generated class for the SurprisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-surprise',
  templateUrl: 'surprise.html',
})
export class SurprisePage {

  formData = {
    category: "restaurants",
    radiusModel: 20
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    this.navCtrl.push(ResultsPage, {formData: this.formData, isSurprise: true});
  }
}
