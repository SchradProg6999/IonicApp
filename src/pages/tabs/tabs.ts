import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { DetailsPage } from '../details/details';
import { SurprisePage } from '../surprise/surprise';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SurprisePage;

  constructor(params: NavParams) {
  }
}
