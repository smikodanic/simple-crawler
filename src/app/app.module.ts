import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; // https://www.npmjs.com/package/ngx-pagination


/* CONSTANTS */
import { API } from './ng/constants/API.constant';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CrawlpageComponent } from './pages/crawlpage/crawlpage.component';
import { ResultsComponent } from './pages/results/results.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crawlpage', component: CrawlpageComponent },
  { path: 'results', component: ResultsComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CrawlpageComponent,
    ResultsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: 'API', useValue: API}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
