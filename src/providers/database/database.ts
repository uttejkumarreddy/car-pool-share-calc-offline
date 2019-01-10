import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
import { transport } from '../../interfaces/transport.interface';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  successes: string[] = [];
  errors: string[] = [];

  public transport: transport[] = [];

  constructor(private sqlite: SQLite, private toastCtrl: ToastController) {
    
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE IF NOT EXISTS participants(participantid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', [])
          .then(() => this.successes.push('Participants table created.'))
          .catch((err) => this.errors.push('Error creating participants table: ' + JSON.stringify(err)));

        db.executeSql('CREATE TABLE IF NOT EXISTS transport(transportid INTEGER PRIMARY KEY AUTOINCREMENT, transportname TEXT, costperkm REAL)', [])
          .then(() => this.successes.push('Transport table created.'))
          .catch((err) => this.errors.push('Error creating transport table: ' + JSON.stringify(err)));

        db.executeSql('CREATE TABLE IF NOT EXISTS trips( ' + 
          'tripid INTEGER PRIMARY KEY AUTOINCREMENT,' + 
          'startdistance REAL,' +
          'enddistance REAL,' +
          'starttime TEXT,' +
          'endtime TEXT,' +
          'costperkm REAL,' +
          'transportid INTEGER,' +
          'FOREIGN KEY(transportid) REFERENCES transport(transportid))', [])
          .then(() => this.successes.push('Trips table created.'))
          .catch((err) => this.errors.push('Error creating trips table: ' + JSON.stringify(err)));

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
        .then(() => this.successes.push('Shares table created.'))
        .catch((err) => this.errors.push('Error creating shares table: ' + JSON.stringify(err)));

      })
      .catch((err) => {
        this.errors.push('Error creating database: ' + err);
      })
  }

  /* Participants Operations */
  addParticipant(name: string) {

  }

  updateParticipant(id: number, name: string) {

  }

  deleteParticipant(id: number) {

  }

  /* Transport Operations */
  getTransport() {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * from transport', [])
          .then((data) => {
            this.transport = [];
            for(let i = 0; i < data.rows.length; i++)
              this.transport.push(data.rows.item(i));
          })
          .catch(err => {
            this.errors.push('getTransport ' + JSON.stringify(err));
          })
      })
      .catch((err) => {
        this.errors.push('getTransport: ' + JSON.stringify(err));
      })
  }

  createTransport(name: string, costperkm: number) {
    let newTransport = [name, costperkm];
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO transport (transportname, costperkm) VALUES (?, ?)', newTransport)
          .then((data) => {
            this.successes.push('createTransport: ' + JSON.stringify(data));
          })
          .catch(err => {
            this.errors.push('createTransport: ' + JSON.stringify(err));
          })
      })
      .catch(err => {
        this.errors.push('createTransport: ' + JSON.stringify(err));
      })
  }

  editTransport(id: number, name: string, costperkm: number) {
    let updatedTransport = [name, costperkm, id];
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE transport set transportname = ?, costperkm = ? where transportid = ?', updatedTransport)
          .then((data) => {
            this.successes.push('editTransport: ' + JSON.stringify(data));
          })
          .catch(err => {
            this.errors.push('editTransport: ' + JSON.stringify(err));
          })
      })
      .catch(err => {
        this.errors.push('editTransport: ' + JSON.stringify(err));
      })
  }

  deleteTransport(id: number) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE from transport where transportid = ?', [id])
          .then((data) => {
            this.successes.push('deleteTransport: ' + JSON.stringify(data));
          })
          .catch(err => {
            this.errors.push('deleteTransport: ' + JSON.stringify(err));
          })
      })
      .catch(err => {
        this.errors.push('deleteTransport: ' + JSON.stringify(err));
      })
  }

  /* Trips operations */
  startTrip(odometer: number, transportid: number) {

  }

  stopTrip(id: number, odometer: number) {

  }

  boardAParticipant(id: number, odometer: number) {

  }

  dropAParticipant(id: number, odometer: number) {

  }

  /* Reports operations */
  getParticipantsTripCost(tripid: number, participantid: number) {

  }

  getParticipantsCost(participantid: number) {

  }

  getTrips() {

  }

  getTripsInPeriod(startdate: string, enddate: string) {

  }

  /* Admin operations */
  getErrors() {
    return this.errors;
  }

  getSuccesses() {
    return this.successes;
  }

}
