import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurprisePage } from './surprise';

@NgModule({
  declarations: [
    SurprisePage,
  ],
  imports: [
    IonicPageModule.forChild(SurprisePage),
  ],
})
export class SurprisePageModule {}
