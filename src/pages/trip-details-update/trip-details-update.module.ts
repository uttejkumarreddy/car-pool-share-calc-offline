import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripDetailsUpdatePage } from './trip-details-update';

@NgModule({
  declarations: [
    TripDetailsUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(TripDetailsUpdatePage),
  ],
})
export class TripDetailsUpdatePageModule {}
