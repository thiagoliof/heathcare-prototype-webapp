import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Therapyst } from './therapyst';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TherapystService {

  private terapyUrl = 'api/therapysts';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTerapists (): Observable<Therapyst[]> {
    return this.http.get<Therapyst[]>(this.terapyUrl)
      .pipe(
        tap(terapists => this.log(`fetched terapists`)),
        catchError(this.handleError('getTerapists', []))
      );
  }

  /** GET terapyst by id. Return `undefined` when id not found */
  getTerapistNo404<Data>(id: number): Observable<Therapyst> {
    const url = `${this.terapyUrl}/?id=${id}`;
    return this.http.get<Therapyst[]>(url)
      .pipe(
        map(terapists => terapists[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} terapist id=${id}`);
        }),
        catchError(this.handleError<Therapyst>(`getTerapyst id=${id}`))
      );
  }

  /** GET terapyst by id. Will 404 if id not found */
  getTerapyst(id: number): Observable<Therapyst> {
    const url = `${this.terapyUrl}/${id}`;
    return this.http.get<Therapyst>(url).pipe(
      tap(_ => this.log(`fetched Terapyst id=${id}`)),
      catchError(this.handleError<Therapyst>(`getTerapyst id=${id}`))
    );
  }

  /* GET terapyst whose name contains search term */
  searchTerapists(term: string): Observable<Therapyst[]> {
    if (!term.trim()) {
      // if not search term, return empty teapyst array.
      return of([]);
    }
    return this.http.get<Therapyst[]>(`api/terapists/?name=${term}`).pipe(
      tap(_ => this.log(`found terapists matching "${term}"`)),
      catchError(this.handleError<Therapyst[]>('searchTerapists', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new teapyst to the server */
  addTerapists (terapist: Therapyst): Observable<Therapyst> {
    return this.http.post<Therapyst>(this.terapyUrl, terapist, httpOptions).pipe(
      tap((terapist: Therapyst) => this.log(`added teapyst w/ id=${terapist.id}`)),
      catchError(this.handleError<Therapyst>('addTerapists'))
    );
  }


  /** DELETE: delete the teapyst from the server */
  deleteTerapyst (terapist: Therapyst | number): Observable<Therapyst> {
    const id = typeof terapist === 'number' ? terapist : terapist.id;
    const url = `${this.terapyUrl}/${id}`;

    return this.http.delete<Therapyst>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Terapyst id=${id}`)),
      catchError(this.handleError<Therapyst>('deleteTerapyst'))
    );
  }

  /** PUT: update the clinic on the server */
  updateTerapist (terapist: Therapyst): Observable<any> {
    return this.http.put(this.terapyUrl, terapist, httpOptions).pipe(
      tap(_ => this.log(`updated terapist id=${terapist.id}`)),
      catchError(this.handleError<any>('updateTerapist'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a terapyst Service message with the MessageService */
  private log(message: string) {
    this.messageService.add('TerapystService: ' + message);
  }
}
