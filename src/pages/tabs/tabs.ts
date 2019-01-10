import { Component } from '@angular/core';

import { TripPage } from '../trip/trip';
import { ResourcesPage } from '../resources/resources';
import { ReportsPage } from '../reports/reports';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TripPage;
  tab2Root = ResourcesPage;
  tab3Root = ReportsPage;

  constructor() {

  }
}
