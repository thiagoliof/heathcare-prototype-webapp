import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Clinic } from './clinic';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClinicService {

  private clinicUrl = 'api/clinics';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getClinics (): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(this.clinicUrl)
      .pipe(
        tap(clinics => this.log(`fetched clinics`)),
        catchError(this.handleError('getClinics', []))
      );
  }

  /** GET clinic by id. Return `undefined` when id not found */
  getClinicNo404<Data>(id: number): Observable<Clinic> {
    const url = `${this.clinicUrl}/?id=${id}`;
    return this.http.get<Clinic[]>(url)
      .pipe(
        map(clinics => clinics[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} clinic id=${id}`);
        }),
        catchError(this.handleError<Clinic>(`getClinic id=${id}`))
      );
  }

  /** GET clinic by id. Will 404 if id not found */
  getClinic(id: number): Observable<Clinic> {
    const url = `${this.clinicUrl}/${id}`;
    return this.http.get<Clinic>(url).pipe(
      tap(_ => this.log(`fetched clinic id=${id}`)),
      catchError(this.handleError<Clinic>(`getClinic id=${id}`))
    );
  }

  /* GET clinices whose name contains search term */
  searchClinics(term: string): Observable<Clinic[]> {
    if (!term.trim()) {
      // if not search term, return empty clinic array.
      return of([]);
    }
    return this.http.get<Clinic[]>(`api/clinics/?name=${term}`).pipe(
      tap(_ => this.log(`found clinics matching "${term}"`)),
      catchError(this.handleError<Clinic[]>('searchClinics', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new clinic to the server */
  addClinic (clinic: Clinic): Observable<Clinic> {
    return this.http.post<Clinic>(this.clinicUrl, clinic, httpOptions).pipe(
      tap((clinic: Clinic) => this.log(`added clinic w/ id=${clinic.id}`)),
      catchError(this.handleError<Clinic>('addClinic'))
    );
  }


  /** DELETE: delete the clinic from the server */
  deleteClinic (clinic: Clinic | number): Observable<Clinic> {
    const id = typeof clinic === 'number' ? clinic : clinic.id;
    const url = `${this.clinicUrl}/${id}`;

    return this.http.delete<Clinic>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted clinic id=${id}`)),
      catchError(this.handleError<Clinic>('deleteClinic'))
    );
  }

  /** PUT: update the clinic on the server */
  updateClinic (clinic: Clinic): Observable<any> {
    return this.http.put(this.clinicUrl, clinic, httpOptions).pipe(
      tap(_ => this.log(`updated clinic id=${clinic.id}`)),
      catchError(this.handleError<any>('updateClinic'))
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

  /** Log a clinic Service message with the MessageService */
  private log(message: string) {
    this.messageService.add('ClinicService: ' + message);
  }
}
