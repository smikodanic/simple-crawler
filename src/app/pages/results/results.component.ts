import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ICrawledData } from 'src/app/ng/interfaces/ICrawledData';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  totalItems: number;
  itemsPerPage: number;
  currentPage: number;

  results: ICrawledData[] | string[];
  errMsg: string | boolean;
  okMsg: string | boolean;


  constructor(
    @Inject('API') private API: any,
    private httpClient: HttpClient,
    private r: Router
  ) {
    this.itemsPerPage = 25;
    this.currentPage = 1;
  }


  ngOnInit() {
    this.getCrawledData();
  }


  // get database list
  private getCrawledData(): void {
    this.httpClient.get(`${this.API.CRAWLER.getData}`)
      .subscribe((apiResp: any) => {
        this.results = apiResp.data;
        // console.log(this.results);
      }, (e: HttpErrorResponse) => {
        // console.error(e);
        this.errMsg = e.error.message;
      });
  }


  pageChanged(newPage: number) {
    this.currentPage = newPage;
  }


}

