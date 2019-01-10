import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sqlite: SQLite,
    private toastCtrl: ToastController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripPage');
  }

  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
