import {ElementRef, EventEmitter, Input, NgZone, Output} from '@angular/core';
import {Directive, HostListener} from '@angular/core';
import {ReorderableRow, Table} from 'primeng/table';


@Directive({
  selector: '[pReordableRowDrop]'
})
export class ReordableRowDrop extends ReorderableRow {
  @Input() set pReordableRowDrop(value: number) {
    this.index = value;
  }

  @Output() dropRow = new EventEmitter<any>();
  override index = 0;
  tmsEventDrop: any;
  dtDraggedRowIndex?:number;
  dtDroppedRowIndex?:number;

  constructor(public override dt: Table, public override el: ElementRef, public override zone: NgZone) {
    super(dt, el, zone);
  }

  //@HostListener('drop', ['$event'])
  override onDrop(event: any): void {
    console.log("#### SONO QUA DIRETTIVA!");
    console.log(event);
    if (this.isEnabled() && this.dt.rowDragging) {
        console.log(this.dt.droppedRowIndex);
        this.dtDraggedRowIndex=this.dt.draggedRowIndex;
        this.dtDroppedRowIndex=this.dt.droppedRowIndex;
        const dropIndex = this.dt.draggedRowIndex > this.dt.droppedRowIndex ? this.dt.droppedRowIndex : this.dt.droppedRowIndex === 0 ? 0 : this.dt.droppedRowIndex - 1;

        this.tmsEventDrop = event;

        const eventArgs = {
            sender : this,
            draggedRowIndex: this.dt.draggedRowIndex,
            droppedRowIndex: dropIndex
        }
        
        //new tmsPTableDropEventArgs(this, this.dt.draggedRowIndex, dropIndex);
        this.dropRow.emit(eventArgs);


    }

    event.preventDefault();

    //event.preventDefault();

  }

  public acceptDrop(): void {
    console.log("#### Accettata!!!");
    console.log(this.tmsEventDrop);
    console.log(this.el);
    this.dt.draggedRowIndex=this.dtDraggedRowIndex!;
    this.dt.droppedRowIndex=this.dtDroppedRowIndex!;
    console.log(this.dt.droppedRowIndex);
    this.dt.onRowDrop(this.tmsEventDrop, this.el.nativeElement);
    //this.tmsEventDrop.preventDefault();

  }

  public rejectDrop(): void {
    //cleanup
    this.tmsEventDrop=null;
    this.dtDraggedRowIndex=undefined;
    this.dtDroppedRowIndex=undefined;
    this.dt.onRowDragLeave(this.tmsEventDrop, this.el.nativeElement);
    this.dt.onRowDragEnd(this.tmsEventDrop);
  }

}
