import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import {ReordableRowDrop} from './reordable-row-drop.directive'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'prime-ng-table-drop-event';

  products: Product[] = [];

  cols: any[]=[];
  logs:string[]=[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // ORDER BY deliveryStatusCode the products
      this.productService.getProductsSmall().then(data => {
        this.products = data.sort((a,b) => a.deliveryStatusCode! > b.deliveryStatusCode! ? -1 :1);
      });

      this.cols = [
          { field: 'name', header: 'Name' },
          { field: 'code', header: 'Code' },
          { field: 'category', header: 'Category' },
          { field: 'deliveryStatusCode', header: 'Status Code' },
          { field: 'deliveryStatus', header: 'Status' }
      ];

  }

  onDropRow(e:any):void{
    if(this.products[e.draggedRowIndex].deliveryStatusCode! <50 && this.products[e.droppedRowIndex].deliveryStatusCode! <50){
      e.sender.acceptDrop();
      this.logs.push(`SUCCESS: Reordered ${this.products[e.draggedRowIndex].name!} in position ${e.droppedRowIndex}.`);
    }else{
      e.sender.rejectDrop();
      this.logs.push(`FAILED: Impossibile move ${this.products[e.draggedRowIndex].name!} in position ${e.droppedRowIndex}. One of those items was delivered yet. :(`);
    }
  }
}
