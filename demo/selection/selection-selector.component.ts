import { Component, ViewChild } from '@angular/core';
import { DataTableSelectionComponent, DatatableComponent } from '../../src';

@Component({
  selector: 'selector-demo',
  template: `
    <div>
      <h3>
        Single Row Selection
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/selection/selection-single.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <div style='float:left;width:75%'>
        <div class="info">
          <p>This demonstrates a simple single selection table with the 3rd row selected by default.</p>
        </div>

        <ngx-datatable #myTable
          class="material"
          [rows]="rows"
          [columnMode]="'force'"
          [columns]="columns"
          [headerHeight]="50"
          [footerHeight]="50"
          [rowHeight]="'auto'"
          [limit]="5"
          [selected]="selected"
          [selectionType]="'single'"
          (activate)="onActivate($event)"
          (select)='onSelect($event)'>
        </ngx-datatable>
      </div>

      <div class='selected-column'>
        <h4>Selections</h4>
        <ul>
          <li *ngFor='let sel of selected'>
            {{sel.name}}
          </li>
          <li *ngIf="!selected.length">No Selections</li>
        </ul>
        <button (click)="selectFirst()">Select First</button>
        <button (click)="selectSecond()">Select Second</button>
      </div>
    </div>
  `
})
export class SelectorComponent {

  rows = [];

  selected = [];

  columns: any[] = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
  ];

  constructor() {
    this.fetch((data) => {
      this.selected = [data[2]];
      this.rows = data;
    });
  }

  selectFirst() {
    const bodyComponent = this.table.bodyComponent;
    bodyComponent.selector.selectRow(null, null, bodyComponent.rows[0]);
  }

  selectSecond() {
    const bodyComponent = this.table.bodyComponent;
    bodyComponent.selector.selectRow(null, null, bodyComponent.rows[1]);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;

}
