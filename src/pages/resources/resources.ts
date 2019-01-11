import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { transport } from '../../interfaces/transport.interface';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { participant } from '../../interfaces/participant.interface';
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
  participants: participant[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private db: DatabaseProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
      this.myTransports = this.db.transport;
  }

  ngOnInit() {
    this.myTransports = this.db.transport;
    this.participants = this.db.participants;
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
              else this.showToast('To edit, name and costperkm is required!');
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

  refreshParticipants() {
    this.db.getParticipants();
    this.participants = this.db.participants;
  }

  addParticipant() {
    this.alertCtrl.create({
      title: 'Add Participant',
      inputs: [
        {
          name: 'name',
          placeholder: 'Participant Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => { }
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.length > 0) this.db.addParticipant(data.name);
            else this.showToast('To add a name, you must type a name!');
          }
        }
      ]
    }).present();
  }

  editParticipant(participant: participant) {
    this.alertCtrl.create({
      title: 'Edit Participant',
      inputs: [
        {
          name: 'name',
          value: participant.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => { }
        },
        {
          text: 'Update',
          handler: data => {
            if(data.name.length > 0) this.db.updateParticipant(participant.participantid, data.name);
            else this.showToast('To add a name, you must type a name!');
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.db.deleteParticipant(participant.participantid);
          }
        }
      ]
    }).present();
  }

  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
