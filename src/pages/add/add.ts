import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { addTransportInterface } from '../../interfaces/transport.interface';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  toAdd: string;

  addTransportModel: addTransportInterface = {
    name: '',
    costPerKm: 0
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
  ) {
    this.toAdd = this.navParams.get('toAdd');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  addTransport() {
    if(parseFloat(this.addTransportModel.costPerKm.toString()) == NaN) {
      this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Please enter only float values in cost/km',
        buttons: ['OK']
      }).present();
    }
    if(this.addTransportModel.name.length > 0 && this.addTransportModel.costPerKm > 0) {
      this.viewCtrl.dismiss(this.addTransportModel);
    }
  }

  showCalculateCostPerKmModal() {
    this.alertCtrl.create({
      title: 'Calculate Cost/Km',
      inputs: [
        {
          name: 'mileage',
          placeholder: 'mileage',
          type: 'number'
        },
        {
          name: 'petrolcost',
          placeholder: 'petrolcost',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Calculate',
          handler: data => {
            this.addTransportModel.costPerKm = data.petrolcost/data.mileage;
          }
        }
      ]
    }).present();
  }

}
