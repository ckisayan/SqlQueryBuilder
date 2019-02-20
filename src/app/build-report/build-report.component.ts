import { QueryBuilderConfig } from 'angular2-query-builder';
import { Component, Input, Output, AfterViewInit, ElementRef, EventEmitter, OnChanges, OnInit } from '@angular/core';
import {Car} from '../entity/car';
import { DbTable } from '../entity/dbTable';


@Component({
  selector: 'app-build-report',
  templateUrl: './build-report.component.html',
  styleUrls: ['./build-report.component.css']
})
export class BuildReportComponent implements OnInit {
  availableCars: Car[];
  selectedCars: Car[];
  draggedCar: Car;
  availableDbTables: DbTable[];
  selectedDbTables: DbTable[];
  draggedDbTable: DbTable;

  constructor() {
    this.availableCars = [
      {vin: '12', year: '1999'},
      {vin: '21', year: '2000'},
    ];
    this.availableDbTables = [
      {tableName: 'Provider', tableDesc: 'billing providers'},
      {tableName: 'Subscriber', tableDesc: 'Subscriber info'},
    ];

    this.selectedCars = [];
    this.selectedDbTables = [];
   }
  query = {
    condition: 'and',
    rules: [
      { field: 'BillingProviderName', operator: 'in', value: 'ah' },
      { field: 'BillingProviderQualifierIdCode', operator: 'like', value: '123xy33n2' }
    ]
  };
  config: QueryBuilderConfig = {
    fields: {
      BillingProviderQualifierIdCode: { name: 'ID Code Qualifier NM108', type: 'string' },
      BillingProviderName: {
        name: 'Provider Org Name NM103',
        type: 'category',
        options: [
          { name: 'Verdugo Hills Hospital', value: 'vhh' },
          { name: 'Adventist Hospital', value: 'ah' },
        ]
      }

    }
  };
  ngOnInit() {
  }

  dropDbTable(event) {
    if ( this.draggedDbTable) {
        const draggedDbTableIndex = this.findIndexDbTable(this.draggedDbTable);
        this.selectedDbTables = [...this.selectedDbTables, this.draggedDbTable];
        this.availableDbTables = this.availableDbTables.filter((val, i) => i !== draggedDbTableIndex);
        this.draggedDbTable = null;
    }
  }
  dragStartDbTable(event, dbTable: DbTable) {
    this.draggedDbTable = dbTable;
  }
  dragStart(event, car: Car) {
    this.draggedCar = car;
  }
  drop(event) {
    if ( this.draggedCar) {
        const draggedCarIndex = this.findIndex(this.draggedCar);
        this.selectedCars = [...this.selectedCars, this.draggedCar];
        this.availableCars = this.availableCars.filter((val, i) => i !== draggedCarIndex);
        this.draggedCar = null;
    }
  }

  dragEndDbTable(event) {
    this.draggedDbTable = null;
  }

  dragEnd(event) {
      this.draggedCar = null;
  }

  findIndexDbTable(dbTable: DbTable) {
    let index = -1;
    for (let i = 0; i < this.availableDbTables.length; i++) {
        if (dbTable.tableName === this.availableDbTables[i].tableName) {
            index = i;
            break;
        }
    }
    return index;
  }
findIndex(car: Car) {
    let index = -1;
    for (let i = 0; i < this.availableCars.length; i++) {
        if (car.vin === this.availableCars[i].vin) {
            index = i;
            break;
        }
    }
    return index;
  }

}
