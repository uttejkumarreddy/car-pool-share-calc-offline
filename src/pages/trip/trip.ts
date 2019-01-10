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

    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE IF NOT EXISTS participants(participantid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', [])
          .then(() => this.showToast('Participants table created.'))
          .catch((err) => this.showToast('Error creating participants table: ' + JSON.stringify(err)));

        db.executeSql('CREATE TABLE IF NOT EXISTS transport(transportid INTEGER PRIMARY KEY AUTOINCREMENT, transportname TEXT)', [])
          .then(() => this.showToast('Transport table created.'))
          .catch((err) => this.showToast('Error creating transport table: ' + JSON.stringify(err)));

        db.executeSql('CREATE TABLE IF NOT EXISTS trips( ' + 
          'tripid INTEGER PRIMARY KEY AUTOINCREMENT,' + 
          'startdistance REAL,' +
          'enddistance REAL,' +
          'starttime TEXT,' +
          'endtime TEXT,' +
          'transportid INTEGER,' +
          'FOREIGN KEY(transportid) REFERENCES transport(transportid))', [])
          .then(() => this.showToast('Trips table created.'))
          .catch((err) => this.showToast('Error creating trips table: ' + JSON.stringify(err)));

        db.executeSql('CREATE TABLE IF NOT EXISTS share( ' +
        'shareid INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'participantid INTEGER,' + 
        'boarddistance REAL,' +
        'dropdistance REAL,' + 
        'boardtime TEXT,' + 
        'droptime TEXT,' + 
        'cost REAL,' + 
        'tripid INTEGER,' + 
        'FOREIGN KEY(tripid) REFERENCES trips(tripid),' +
        'FOREIGN KEY(participantid) REFERENCES participants(participantid))', [])
        .then(() => this.showToast('Shares table created.'))
        .catch((err) => this.showToast('Error creating shares table: ' + JSON.stringify(err)));

      })
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
