import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the TripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html',
})
export class TripPage {

  tripstatus = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private db: DatabaseProvider,
    private modalCtrl: ModalController
  ) {
    this.tripstatus = this.db.tripStatus;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripPage');
  }

  startTrip() {
    let tripDetails = this.modalCtrl.create('TripDetailsUpdatePage');
    tripDetails.onDidDismiss(data => {
      if(!data.startTrip) return;
      this.db.updateTripStatus(1);
      this.tripstatus = 1;
    });
    tripDetails.present();
  }

  personBoarded() {

  }

  personDropped() {

  }

  stopTrip() {

  }

  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
