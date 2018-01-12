import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-datatable',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dataTable.component.scss'],
  template: `
    <div>
      <ngx-datatable class="material"
        [rows]="rows"
        [limit]="limit"
        [footerHeight]="50"
        [rowHeight]="100"
        [columns]="columns">
      </ngx-datatable>
    </div>
  `
})
export class DataTableComponent {
  @Input() rows;
  @Input() columns;
  @Input() limit;
}
