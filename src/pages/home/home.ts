import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResultsPage } from '../results/results'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public formData = {
    category: "dummy",
    radiusModel: 5,
    diningType: {
      dineIn: false,
      takeOut: false,
      delivery: false
    }
  };

  constructor(public navCtrl: NavController) {

  }


  findRest(){
    this.navCtrl.push(ResultsPage, {formData: this.formData});
  }
}
