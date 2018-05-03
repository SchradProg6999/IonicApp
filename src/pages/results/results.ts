import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { YelpServiceProvider } from '../../providers/yelp-service/yelp-service'

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const newLimit = 10;

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})

export class ResultsPage {

  public formData;
  public isSurprise = false;
  public curRes;
  private restaurantList = [];
  private listSize;

  constructor(public yelpService: YelpServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.formData = navParams.get("formData");
    this.isSurprise = (navParams.get("isSurprise") != undefined) ? navParams.get("isSurprise") : false;
    this.getRestaurantList(this.formData);
  }

  getRestaurantList(reqData?){
    let self = this;
    this.yelpService.getRestaurantList(function(data){
      console.log(data);
      if(self.restaurantList.length == 0){
        self.restaurantList = data.businesses;
        self.getRestaurantDeets();
      }
      else{
        self.restaurantList = self.restaurantList.concat(data.businesses);
      }
      self.listSize = self.restaurantList.length;
      console.log("New Listsize: " + self.listSize);
    }, reqData);
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

    this.curRes["cuisineList"] = list;
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

    this.curRes["openTime"] = openTime;
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

    this.curRes["closeTime"] = closeTime;
    return closeTime;
  }

  getDistance(res){
    let miles = (Number(res.distance)/1609.34).toFixed(2);
    this.curRes["dist"] = miles;
    return miles;
  }

  declineOption(){
    this.removeRestaurantFromList(this.curRes);
  }

  viewDeets(){
    this.navCtrl.push(DetailsPage, {data: this.curRes});
  }


  removeRestaurantFromList(res){
    let index = this.restaurantList.findIndex(item => item.id == res.id);
    if(index != undefined && index > -1){
      this.restaurantList.splice(index, 1);
      console.log(this.restaurantList);
      this.getRestaurantDeets();
      console.log("List size after removal: " + this.restaurantList.length);
      if(this.restaurantList.length == Math.floor(this.listSize/2)){
        console.log("Another call made");
        this.getRestaurantList();
      }
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }
}
