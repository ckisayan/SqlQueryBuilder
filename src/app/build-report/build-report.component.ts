import { QueryBuilderConfig } from 'angular2-query-builder';
import { Component, Input, Output, AfterViewInit, ElementRef, EventEmitter, OnChanges, OnInit } from '@angular/core';
import {Car} from '../entity/car';
import { DbTable, DbColumn, QueryResultset } from '../entity/dbTable';


@Component({
  selector: 'app-build-report',
  templateUrl: './build-report.component.html',
  styleUrls: ['./build-report.component.css']
})
export class BuildReportComponent implements OnInit {

  availableDbTables: DbTable[];
  selectedDbTables: DbTable[];
  draggedDbTable: DbTable;


  availableDbColumns: DbColumn[];
  selectedDbColumn: DbColumn[];

  queryResultSet: QueryResultset[];
  constructor() {

    this.availableDbTables = [
      {tableName: 'Provider', tableDesc: 'Billing Provider - 2010AA'},
      {tableName: 'PayToAddress', tableDesc: 'Pay-To Address  Name - 2010AB'},
      {tableName: 'PayToPlan', tableDesc: 'Pay-To Plan Name - 2010AC'},
      {tableName: 'Subscriber', tableDesc: 'Subscriber Name - 2010BA'},
      {tableName: 'Payer', tableDesc: 'Payer Name - 2010BB'},
    ];

    this.availableDbColumns = [
      {columnName: 'Entity ID Code', columnDesc: 'Entity ID Code - NM101'},
      {columnName: 'Entity Type Qualifier', columnDesc: 'Entity Type Qualifier - NM102'},
      {columnName: 'Name Last or Organization Name', columnDesc: 'Name Last or Organization Name - NM103'}

    ];

    this.queryResultSet = [
      {claimIdentifier: '122xn32bb3', providerName: 'Adventist Hospital',
        providerAddress: '123 Glendale st, Glendale Ca', providerTaxIdentifier: 'L323232NN332', providerContactName: 'Chris Isayan'},
      {claimIdentifier: '122xn32bn4', providerName: 'Memorial Hospital',
        providerAddress: '321 Brand Blvd, Glendale Ca', providerTaxIdentifier: 'L323232NN332', providerContactName: 'Sumeet Singh'}
    ];


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

  dragEndDbTable(event) {
    this.draggedDbTable = null;
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


}
