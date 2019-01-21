import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { transport, checkedTransport } from '../../interfaces/transport.interface';
import { participant, checkedParticipant } from '../../interfaces/participant.interface';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the TripDetailsUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-details-update',
  templateUrl: 'trip-details-update.html',
})
export class TripDetailsUpdatePage {

  allTransports: transport[] = [];
  allParticipants: participant[] = [];

  checkedParticipants: checkedParticipant[] = [];
  checkedTransport: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db: DatabaseProvider,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripDetailsUpdatePage');
  }

  ngOnInit() {

    this.allTransports = this.db.transport;
    if(this.allTransports.length == 0) {
      this.showToast('At least one transport must be added!');
      this.viewCtrl.dismiss();
    }

    this.allParticipants = this.db.participants;
    if(this.allParticipants.length == 0) {
      this.showToast('At least one participant must be added!');
      this.viewCtrl.dismiss();
    }

    this.checkedTransport = this.allTransports[0].transportid;

    for(let participant of this.allParticipants) {
      let newCheckedParticipant = {
        ...participant, 'checked': false
      }
      this.checkedParticipants.push(newCheckedParticipant);
    }
  }

  updateTripDetails() {
    let participantIDs = this.checkedParticipants
                            .filter(person => person.checked === true)
                            .map(person => person.participantid);
    if(participantIDs.length < 1) {
      this.showToast('At least one participant must be selected.');
      return;
    }
    let tripStartInfo = {
      'participantIds': participantIDs,
      'transportId': this.checkedTransport,
      'startTrip': true
    }
    this.viewCtrl.dismiss(tripStartInfo);
  }

  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
