import { AfterViewInit, Component, ViewChild, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  @Input() data: any;
  @Input() columns: any;
  @Input() extra: any;
  @Input() canSelect: boolean = true;
  @Output() itemEmitter = new EventEmitter<number>();

  listFragments: any;
  saveData: any;
  sens: boolean = false;
  saveColumn: string = '';
  currentEmit: string = '1';

  page: number = 0;
  numberOfElement: number = 5;


  ngOnInit () {
    this.saveData = this.data;
    this.listFragments = this.getListFragment(this.page, this.numberOfElement);
  }

  emitItem (item: any) {
    this.currentEmit = item;
    this.itemEmitter.emit(item);
  }

  getListFragment (page: number, numberOfElement: number) : {}[] {

    let newList = [];
    for (let index = page * numberOfElement, i = 0; index < numberOfElement * (page +1); index++, i++)
      if (this.saveData.length > index)
        newList.push(this.saveData[index]);
      else
        break;
      
    return newList;
  }

  getPages () : number[] {

    let pages = [];
    for (let index = 0; index < this.data.length / this.numberOfElement; index++)
      pages.push(index)
      
    return pages;
  }

  setNumberOfElement(num: string) {
    this.page = 0;
    this.numberOfElement = +num;
    this.listFragments = this.getListFragment(this.page, this.numberOfElement);
  }

  goToPage (page: number) {
    this.page = page;
    this.listFragments = this.getListFragment(page, this.numberOfElement);
  }

  nextPage () {
    if (this.page  < this.getPages()[this.getPages().length - 1])
      this.listFragments = this.getListFragment (++this.page, this.numberOfElement)
  }
  
  previousPage () {
    if (this.page > this.getPages()[0])
      this.listFragments = this.getListFragment (--this.page, this.numberOfElement)
  }

  filter (search: string) {
    
    this.page = 0;
    this.saveData = this.data.filter((data: any) => {
      for (const column of this.columns) {
        if (search.search(data[`${column}`].toString()) != -1){
          
          console.log("hey");
          return true;
        }
      }
      return false;
    });
    
    this.listFragments = this.getListFragment(this.page, this.numberOfElement);
    
  }

  sort (column: string) {
    
    if (this.saveColumn === column)
      this.sens = !this.sens
    else{
      this.sens = true;
      this.saveColumn = column;
    }

    this.page = 0;
    this.saveData = this.data.sort((a: any, b:any) => {
        if (a[`${column}`] > b[`${column}`])

          if (this.sens)
            return 1;
          
          else
            return -1;
        else

          if (!this.sens)
            return 1;
          
          else
            return -1;
        
    }
      //  
    );

    this.listFragments = this.getListFragment(this.page, this.numberOfElement);
    
  }
  
}
