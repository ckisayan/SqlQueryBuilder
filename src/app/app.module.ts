import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BuildReportComponent } from './build-report/build-report.component';
import { QueryBuilderModule } from 'angular2-query-builder';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from 'primeng/dragdrop';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/datatable';
import { CarService } from './service/carservice';

@NgModule({
  declarations: [
    AppComponent,
    BuildReportComponent

  ],
  imports: [
    BrowserModule,
    QueryBuilderModule,
    FormsModule,
    DragDropModule,
    TableModule,
    DataTableModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
