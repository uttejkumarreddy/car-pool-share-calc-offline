import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  successes: string[];
  errors: string[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db: DatabaseProvider,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.successes = this.db.getSuccesses();
    this.errors = this.db.getErrors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

  refreshLogs() {
    this.successes = this.db.getSuccesses();
    this.errors = this.db.getErrors();
  }

  showError(error) {
    this.alertCtrl.create({
      title: 'Error',
      message: error
    }).present();
  }

  showSuccess(success) {
    this.alertCtrl.create({
      title: 'Success',
      message: success
    }).present();
  }

}
