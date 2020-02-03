import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IInput, ICrawledData } from 'src/app/ng/interfaces';



@Component({
  selector: 'app-crawlpage',
  templateUrl: './crawlpage.component.html',
  styleUrls: ['./crawlpage.component.scss']
})
export class CrawlpageComponent implements OnInit {
  inp: IInput;
  result: ICrawledData;
  errMsg: string;
  okMsg: string;


  constructor(
    @Inject('API') private API: any,
    private httpClient: HttpClient,
    private r: Router,
    private ar: ActivatedRoute
  ) {

    // init task object
    this.inp = {
      url: 'https://www.dex8.com'
    };
  }


  ngOnInit() {
  }



  // API request -- start/crawler
  start_crawler(): void {
    const apiUrl: string = this.API.CRAWLER.start;
    this.result = undefined;

    this.httpClient.post(apiUrl, this.inp)
      .subscribe((apiResp: any) => {
        // console.log(apiResp);
        this.errMsg = '';
        this.result = apiResp;
        setTimeout(() => {
          this.close(); // close messages
          // this.r.navigate([`/customer/tasks/addedit/${apiResp.data._id}`]);
        }, 2100);
      }, (e: HttpErrorResponse) => {
        console.error(e);
        this.errMsg = e.message || e.error.message;
        this.close(3400); // close messages
      });
  }


  // close error and success messages
  private close(ms?: number) {
    setTimeout(() => {
      this.errMsg = '';
      this.okMsg = '';
    }, ms);
  }



}
