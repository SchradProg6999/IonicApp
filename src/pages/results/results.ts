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
  private restaurantList = [];
  private listSize;

  constructor(public yelpService: YelpServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.formData = navParams.get("formData");
    this.getRestaurantList();
  }

  getRestaurantList(){
    this.yelpService.getRestaurantList(this.formData).subscribe(
      data => {
        if(this.restaurantList.length == 0){
          this.restaurantList = data.businesses;
          this.getRestaurantDeets();
        }
        else{
          this.restaurantList = this.restaurantList.concat(data.businesses);
        }
        this.listSize = this.restaurantList.length;
        console.log("New Listsize: " + this.listSize);
      },
      errors => {
        console.log("Failure in Yelp API call, results.ts");
      }
    );
  }

  getRestaurantDeets(){
    let rand = Math.floor(Math.random() * this.restaurantList.length);
    let res = this.restaurantList[rand];

    this.yelpService.getRestaurantDetails(res.id).subscribe(
      deets => {
        this.curRes = deets;
        this.curRes["distance"] = res.distance;
        this.curRes.id = res.id;
      },
      errors => {
        console.log("Could not find restaurant deets");
      }
    );
  }

  buildCuisineList(res){
    let list = "";
    res.categories.forEach((cat, i) => {
      if(i == res.categories.length - 1)
        list += cat.title;
      else
        list += cat.title + ", ";
    });
    return list;
  }

  getDay(){
    var d = new Date();
    return d.getDay();
  }

  // converts military time coming from yelp to the stupid USA standard time....pricks... I hate time
  // returns converted opening time
  getOpenTime(res){
    let openTime = "";
    

    let startHour = res.hours[0].open[this.getDay()].start.substring(0, 2);
    let startMinute = res.hours[0].open[this.getDay()].end.substring(2, 4);

    openTime = (startHour > 12) ? startHour - 12 : (startHour == "00") ? "12" : startHour;
    openTime += ":" + startMinute;
    openTime += (startHour >= 12) ? "PM" : "AM";

    return openTime;
  }

  // converts military time coming from yelp to the stupid USA standard time....pricks... I hate time
  // returns converted closing time
  getCloseTime(res){
    let closeTime = "";
    let endHour = res.hours[0].open[this.getDay()].end.substring(0, 2);
    let endMinute = res.hours[0].open[this.getDay()].end.substring(2, 4);

    closeTime = (endHour > 12) ? endHour - 12 : (endHour == "00") ? "12" : endHour; 
    closeTime += ":" + endMinute;
    closeTime += (endHour >= 12) ? "PM" : "AM";

    return closeTime;
  }

  getAddress(res){
    let addressLine = "";
    res.location.display_address.forEach(address => {
      addressLine += address + " ";
    });
    return addressLine;
  }

  getDistance(res){
    return (Number(res.distance)/1609.34).toFixed(2);
  }

  declineOption(){
    this.removeRestaurantFromList(this.curRes);
  }

  viewDeets(){

  }


  removeRestaurantFromList(res){
    let index = this.restaurantList.findIndex(item => item.id == res.id);
    if(index != undefined && index > -1){
      this.restaurantList.splice(index, 1);
      this.getRestaurantDeets();
      console.log("List size after removal: " + this.restaurantList.length);
      if(this.restaurantList.length == Math.floor(this.listSize/2)){
        console.log("Another call made");
        this.formData.limit = 3;
        if(this.formData.offset < 3){
          this.formData.offset = 3;
        }
        else{
          this.formData.offset ++;
        }
        console.log(this.formData.offset);
        this.getRestaurantList();
      }
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }
}
