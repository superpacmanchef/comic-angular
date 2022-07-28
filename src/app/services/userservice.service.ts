import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  _isLoged: boolean = false;

  _user: any = null;
  _collection: Comic_ShortBoxed_SplitTitle_Image[] = [];
  _pullList: string[] = [];

  get isLoged() {
    return this._isLoged;
  }
  set isLoged(currLogState: boolean) {
    this._isLoged = currLogState;
  }

  get user() {
    return this._user;
  }
  set user(user: any) {
    this._user = user;
  }

  get pullList() {
    return this._pullList;
  }
  set pullList(pullList: string[]) {
    this._pullList = pullList;
  }

  get collection() {
    return this._collection;
  }
  set collection(collection: Comic_ShortBoxed_SplitTitle_Image[]) {
    this._collection = collection;
  }

  isUserLoged() {
    const url = '/api/userHandler';
    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError((error) => {
        this.isLoged = false;
        this.user = {};
        this.collection = [];
        this.pullList = [];
        return of(error);
      })
    );
  }

  login(username: string, password: string) {
    const url = '/api/userHandler/login';
    return this.http.post(url, { username, password }, this.httpOptions).pipe(
      mergeMap((res: any) => {
        this.isLoged = true;
        this.user = res.user;
        this.collection = [...res.user.collection];
        this.pullList = [...res.user.pullList];
        return of(true);
      }),
      catchError((error) => {
        this.isLoged = false;
        this.user = {};
        this.collection = [];
        this.pullList = [];
        return of(false);
      })
    );
  }

  register(
    username: string,
    password: string,
    email: string,
    passwordRepeat: string
  ) {
    const url = '/apiu/userHandler/register';

    return this.http
      .post(
        url,
        { username, password, email, passwordRepeat },
        this.httpOptions
      )
      .pipe(
        mergeMap((res) => {
          return this.login(username, password);
        }),
        catchError((error) => {
          return of(false);
        })
      );
  }

  getCollection() {
    const url = '/api/collectionHandler/';
    return this.http
      .get<{ collection: Comic_ShortBoxed_SplitTitle_Image[] }>(
        url,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          this.collection = [];
          return of(error);
        })
      );
  }
  getPullList() {
    const url = '/api/pullHandler/';
    return this.http.get<string[]>(url, this.httpOptions).pipe(
      catchError((error) => {
        console.log(error);
        this.pullList = [];
        return of(false);
      })
    );
  }

  addCollection(comic: Comic_ShortBoxed_SplitTitle_Image) {
    const url = '/api/collectionHandler/';
    return this.http.post<Comic_ShortBoxed_SplitTitle_Image[]>(url, {
      ...this.httpOptions,
      comic,
    });
  }
  deleteCollection(diamond_id: string) {
    const url = '/api/collectionHandler/';
    return this.http.delete<Comic_ShortBoxed_SplitTitle_Image[]>(url, {
      ...this.httpOptions,
      body: { diamond_id: diamond_id },
    });
  }

  addPullList(comic: string) {
    const url = '/api/pullHandler/';
    return this.http.post<string[]>(url, {
      ...this.httpOptions,
      comic,
    });
  }
  deletePullList(comic: string) {
    const url = '/api/pullHandler/';
    return this.http.delete<string[]>(url, {
      ...this.httpOptions,
      body: { comic: comic },
    });
  }
}
