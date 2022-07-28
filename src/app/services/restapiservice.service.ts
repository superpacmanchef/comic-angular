import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RESTAPIService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getWeeksComics(week: string) {
    const url = `/api/weekComics?week=${week}`;
    return this.http.get<Comic_ShortBoxed_SplitTitle[]>(url, this.httpOptions);
  }

  getComicsCover(comic: Comic_ShortBoxed_SplitTitle_Image) {
    const url = '/api/pageComics';
    return this.http.post<string>(url, { comic }, this.httpOptions);
  }
}
