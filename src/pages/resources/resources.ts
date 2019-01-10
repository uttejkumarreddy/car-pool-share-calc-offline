import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { transport } from '../../interfaces/transport.interface';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
/**
 * Generated class for the ResourcesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {

  myTransports: transport[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private db: DatabaseProvider,
    private alertCtrl: AlertController) {
      this.myTransports = this.db.transport;
  }

  ngOnInit() {
    this.myTransports = this.db.transport;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourcesPage');
  }

  refreshTransport() {
      this.db.getTransport();
      this.myTransports = this.db.transport;
  }

  addTransport() {
    let addModal = this.modalCtrl.create('AddPage', {
      toAdd: 'transport'
    });
    addModal.onDidDismiss(data => {
      if(data.name && data.costPerKm) {
        this.db.createTransport(data.name, data.costPerKm);
        this.db.getTransport();
      }
    });
    addModal.present();
  }

  editTransport(myTransport: transport) {
    this.alertCtrl.create({
      title: 'Update Transport',
      inputs: [
        {
          name: 'name',
          value: myTransport.transportname
        },
        {
          name: 'costperkm',
          value: myTransport.costperkm.toString(),
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
          text: 'Update',
          handler: data => {
            if(data.name && data.costperkm) {
              if(data.name.length > 0 && data.costperkm > 0) {
                this.db.editTransport(myTransport.transportid, data.name, data.costperkm);
              }
            }
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.db.deleteTransport(myTransport.transportid);
          }
        }
      ]
    }).present();
  }

}
