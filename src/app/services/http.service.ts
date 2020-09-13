import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';


@Injectable({ providedIn: 'root' })

export class HttpService {

  readonly baseUrls: any = [
    { suffix: 'api', urlValue: environment.apiUrl },
  ];
  readonly getGamesDetails = `b/5d45e4d789ed890b24cb25f5`;

  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  private getRelativeUrl(urlType: string) {
    let urlValue;
    let urlData = this.baseUrls.find(ele => ele.suffix === urlType);
    if (urlData) {
      urlValue = urlData.urlValue;
    }
    return urlValue;
  }

  // will have to change options logic for Incoming options as paramter
  private showloader(showLoader: boolean, options?: any) {
    let headers = new HttpHeaders({
      'SkipLoader': showLoader.toString()
    });
    const requestOptions = {
      headers: headers,
    };
    Object.assign(requestOptions, options);
    return  requestOptions;
  }


  get(url: string, type: string, showLoader: boolean = false, options?) {
    const requestOptions = this.showloader(showLoader, options);

    let urlValue = this.getRelativeUrl(type);
    if (urlValue) {
      urlValue = urlValue + url;
      return this.http.get(urlValue, requestOptions).pipe(catchError((error) => {
        return throwError(error);
      }))
    } else {
      this.snackBar.open('Invalid URL', 'close', 'red-snackbar');
      return;
    }
  }

  post(url: string, data: any, type: string, showLoader: boolean = false, options?) {
    const requestOptions = this.showloader(showLoader, options);
    let urlValue = this.getRelativeUrl(type);
    if (urlValue) {
      urlValue = urlValue + url;
      return this.http.post(urlValue, data, requestOptions).pipe(catchError((error) => {
        return throwError(error);
      }))
    } else {
      this.snackBar.open('Invalid URL', 'close', 'red-snackbar');
      return;
    }
  }

  put(url: string, data: any, type: string, showLoader: boolean = false, options?) {
    const requestOptions = this.showloader(showLoader, options);
    let urlValue = this.getRelativeUrl(type);

    if (urlValue) {
      urlValue = urlValue + url;

      return this.http.put(urlValue, data, requestOptions).pipe(catchError((error) => {
        return throwError(error);
      }))
    } else {
      this.snackBar.open('Invalid URL', 'close', 'red-snackbar');
      return;
    }
  }

  delete(url: string, type: string, showLoader: boolean = false, options?) {
    const requestOptions = this.showloader(showLoader, options);
    let urlValue = this.getRelativeUrl(type);
    if (urlValue) {
      urlValue = urlValue + url;
      return this.http.delete(urlValue, requestOptions).pipe(catchError((error) => {
        return throwError(error);
      }))
    } else {
      this.snackBar.open('Invalid URL', 'close', 'red-snackbar');
      return;
    }
  }



}
