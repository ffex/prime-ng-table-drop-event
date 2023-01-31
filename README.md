# PrimeNg Table Drop Event Example

This project is an example of how to override the OnDrop function in a PrimeNg table; the new onDrop raises an event so you can, in every component you want, put conditions to accept or reject the reorder.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3 and [PrimeNG](https://github.com/primefaces/primeng) version 15.1.1.

## How to use in your Project
1. You can use this in a Angular with PrimeNg project.
2. The only file you need is [reordable-row-drop.directive.ts](reordable-row-drop.directive.ts), copy that in your angular project.
    - NOTE: Add it in the module declarations
3. replace the PrimeNg default `[pReorderableRow]="index"` with the custom one `[pReordableRowDrop]="index" (dropRow)="onDropRow($event)"`. Example:
```
  <p-table [value]="products" [columns]="cols" [reorderableColumns]="true" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="header" let-columns>
      <tr>
        <th style="width:3rem"></th>
        <th style="width:3rem">#</th>
        <th *ngFor="let col of columns" pReorderableColumn>
          {{col.header}}
        </th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowData let-columns="columns" let-index="rowIndex">
      <tr [pReordableRowDrop]="index" (dropRow)="onDropRow($event)">
        <td>
          <span class="pi pi-bars" pReorderableRowHandle></span>
        </td>
        <td>
          {{index}}
        </td>
        <td *ngFor="let col of columns">
          {{rowData[col.field]}}
        </td>
      </tr>
    </ng-template>
  </p-table>
```
4. Implement the event call:
```
  onDropRow(e: any): void {
    if (contidito) {
      e.sender.acceptDrop();
    } else {
      e.sender.rejectDrop();
    }
  }
```
5. Now you have the power over the row reorder :star_struck:
  - **IMPORTANT**: Use always or `e.sender.acceptDrop()` or `e.sender.rejectDrop()` in the event or the software will crash.
## How to test the example
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
