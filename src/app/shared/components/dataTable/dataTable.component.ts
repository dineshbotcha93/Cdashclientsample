import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-datatable',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dataTable.component.scss'],
  template: `
    <div>
      <ngx-datatable class="material"
        [rows]="rows"
        [limit]="1"
        [footerHeight]="50"
        [columns]="columns">
      </ngx-datatable>
    </div>
  `
})
export class DataTableComponent {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
}
