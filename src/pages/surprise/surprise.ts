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

  formData;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data.lat);
    console.log(navParams.data.long);
  }

  // adds random values to the formData object to generate the list
  setRandomData(){
    
  }

  loadRandomList(){
    this.navCtrl.push(ResultsPage, {formData: this.formData});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurprisePage');
    this.setRandomData();
  }

  generateRandomNumber(){

  }

}
