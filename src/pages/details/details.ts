import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  public curRes;

  constructor(private callNumber: CallNumber, public navCtrl: NavController, public navParams: NavParams) {
    this.curRes = navParams.get("data");
    console.log(this.curRes);
  }

  getAddress(res){
    let addressLine = "";
    res.location.display_address.forEach(address => {
      addressLine += address + " ";
    });
    return addressLine;
  }

  formatPhone(res){
    if(this.hasPhone(res)){
      let phoneNum = "";
      let areaCode = res.phone.substring(2,5);
      let middleDigits = res.phone.substring(5, 8);
      let endDigits = res.phone.substring(8);
      phoneNum += "(" + areaCode + ")" + " " + middleDigits + "-" + endDigits;
      return phoneNum;
    }
    else{
      return "";
    }
  }

  hasPhone(res){
    return (res.phone != undefined && res.phone != "");
  }

  callNum(){
      this.callNumber.callNumber(this.curRes.phone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
}
