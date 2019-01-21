import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripDetailsPage } from './trip-details';

@NgModule({
  declarations: [
    TripDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TripDetailsPage),
  ],
})
export class TripDetailsPageModule {}
