import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-datatable',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dataTable.component.scss'],
  template: `
    <div>
      <ngx-datatable class="bootstrap"
        [rows]="rows"
        [limit]="limit"
        [columns]="columns"
        [columnMode]="'flex'"
        [headerHeight]="40"
        [footerHeight]="40"
        [limit]="10"
        [rowHeight]="'auto'"
        [reorderable]="reorderable"
        [sorts]="[{prop: messageDate, dir: 'desc'}]">
      </ngx-datatable>
    </div>
  `
})
export class DataTableComponent {
  @Input() rows;
  @Input() columns;
  @Input() limit;
  @Input() reorderable;
  @Input() sortColumn;
  @Input() sortOrder;
}
