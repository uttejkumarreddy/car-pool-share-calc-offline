import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { transport } from '../../interfaces/transport.interface';
import { participant } from '../../interfaces/participant.interface';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

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
  public participants: participant[] = [];
  public tripStatus: number = 0;

  constructor(private sqlite: SQLite, private storage: Storage) {
    
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

      this.getTransport();
      this.getParticipants();
      this.getTripStatus();
  }

  /* Participants Operations */
  getParticipants() {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * from participants', [])
          .then(data => {
            this.participants = [];
            for(let i = 0; i < data.rows.length; i++)
              this.participants.push(data.rows.item(i));
          })
          .catch(err => this.errors.push('getParticipants: ' + JSON.stringify(err)))         
      })
      .catch(err => this.errors.push('getParticipants: ' +  JSON.stringify(err)))
  }

  addParticipant(name: string) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO participants (name) VALUES (?)', [name])
          .then(result => {
            this.successes.push('addParticipant: ' + JSON.stringify(result));
          })
          .catch(err => this.errors.push('addParticipant: ' + JSON.stringify(err)));
      })
      .catch(err => this.errors.push('addParticipant: ' + JSON.stringify(err)));
  }

  updateParticipant(id: number, name: string) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE participants set name = ? where participantid = ?', [name, id])
          .then(result => this.successes.push('updateParticipant: ' + JSON.stringify(result)))
          .catch(err => this.errors.push('updateParticipant: ' + JSON.stringify(err)));
      })
      .catch(err => this.errors.push('updateParticipant: ' + JSON.stringify(err)));
  }

  deleteParticipant(id: number) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM participants where participantid = ?', [id])
          .then(result => this.successes.push('deleteParticipant: ' + JSON.stringify(result)))
          .catch(err => this.errors.push('deleteParticipant: ' + JSON.stringify(err)))
      })
      .catch(err => this.errors.push('deleteParticipant: ' + JSON.stringify(err)));
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
          .catch(err => this.errors.push('getTransport ' + JSON.stringify(err)))
      })
      .catch(err => this.errors.push('getTransport: ' + JSON.stringify(err)))
  }

  createTransport(name: string, costperkm: number) {
    let newTransport = [name, costperkm];
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO transport (transportname, costperkm) VALUES (?, ?)', newTransport)
          .then(result => this.successes.push('createTransport: ' + JSON.stringify(result)))
          .catch(err => this.errors.push('createTransport: ' + JSON.stringify(err)))
      })
      .catch(err => this.errors.push('createTransport: ' + JSON.stringify(err)))
  }

  editTransport(id: number, name: string, costperkm: number) {
    let updatedTransport = [name, costperkm, id];
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE transport set transportname = ?, costperkm = ? where transportid = ?', updatedTransport)
          .then(result => this.successes.push('editTransport: ' + JSON.stringify(result)))
          .catch(err => this.errors.push('editTransport: ' + JSON.stringify(err)))
      })
      .catch(err => this.errors.push('editTransport: ' + JSON.stringify(err)))
  }

  deleteTransport(id: number) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE from transport where transportid = ?', [id])
          .then(result => this.successes.push('deleteTransport: ' + JSON.stringify(result)))
          .catch(err => this.errors.push('deleteTransport: ' + JSON.stringify(err)))
      })
      .catch(err => this.errors.push('deleteTransport: ' + JSON.stringify(err)))
  }

  /* Trips operations */
  startTrip(odometer: number, transportid: number) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

      })
      .catch(err => this.errors.push('startTrip: ' + JSON.stringify(err)));
  }

  stopTrip(id: number, odometer: number) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

      })
      .catch(err => this.errors.push('stopTrip: ' + JSON.stringify(err)));
  }

  boardAParticipant(id: number, odometer: number) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

      })
      .catch(err => this.errors.push('boardAParticipant: ' + JSON.stringify(err)));
  }

  dropAParticipant(id: number, odometer: number) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

      })
      .catch(err => this.errors.push('dropAParticipant: ' + JSON.stringify(err)));
  }

  /* Reports operations */
  getParticipantsTripCost(tripid: number, participantid: number) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

      })
      .catch(err => this.errors.push('getParticipantsTripCost: ' + JSON.stringify(err)));
  }

  getParticipantsCost(participantid: number) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

      })
      .catch(err => this.errors.push('getParticipantsCost: ' + JSON.stringify(err)));
  }

  getTrips() {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

      })
      .catch(err => this.errors.push('getTrips: ' + JSON.stringify(err)));
  }

  getTripsInPeriod(startdate: string, enddate: string) {
    this.sqlite.create({
      name: 'carpool.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

      })
      .catch(err => this.errors.push('getTripsInPeriod: ' + JSON.stringify(err)));
  }

  /* Admin operations */
  getErrors() {
    return this.errors;
  }

  getSuccesses() {
    return this.successes;
  }

  /* Trip Status Operations */
  getTripStatus() {
    this.storage.get('tripstatus')
      .then(val => this.tripStatus = val)
      .catch(err => {
        this.errors.push('getTripStatus: ' + JSON.stringify(err));
        this.storage.set('tripstatus', 0);
      })
  }

  updateTripStatus(status) {
    this.storage.set('tripstatus', status);
  }

}
