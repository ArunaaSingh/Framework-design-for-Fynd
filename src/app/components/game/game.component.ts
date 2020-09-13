import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GamesElement } from 'src/app/models/games';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['editors_choice', 'genre', 'platform', 'score', 'title'];
  dataSource = new MatTableDataSource<GamesElement>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = [];
  ELEMENT_DATA: GamesElement[] = [];

  constructor(private dataservice: HttpService) { }

  ngOnInit(): void {
    this.dataservice.get(this.dataservice.getGamesDetails, "api", true).subscribe(
      (res: any) => {
        this.ELEMENT_DATA = res;
        res.slice(1).forEach((x: any) => {
          this.options.includes(x.platform) ? null : this.options.push(x.platform);
        });
        this.dataSource.data = res.slice(1) as GamesElement[];
      }
    );

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.myControl.valueChanges
      .subscribe(v => {

        if (!v) {
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          return;
        }

        const newDataSource = this.ELEMENT_DATA.filter(ob => ob.platform === v);
        this.dataSource = new MatTableDataSource(newDataSource);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
