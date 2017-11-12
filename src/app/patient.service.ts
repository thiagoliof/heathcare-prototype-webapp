import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Patient } from './patient';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PatientService {

  private patientUrl = 'api/patients';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getPatients (): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientUrl)
      .pipe(
        tap(patients => this.log(`fetched patients`)),
        catchError(this.handleError('getPatients', []))
      );
  }

  /** GET patient by id. Return `undefined` when id not found */
  getPatientNo404<Data>(id: number): Observable<Patient> {
    const url = `${this.patientUrl}/?id=${id}`;
    return this.http.get<Patient[]>(url)
      .pipe(
        map(patients => patients[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} patient id=${id}`);
        }),
        catchError(this.handleError<Patient>(`getPatient id=${id}`))
      );
  }

  /** GET patient by id. Will 404 if id not found */
  getPatient(id: number): Observable<Patient> {
    const url = `${this.patientUrl}/${id}`;
    return this.http.get<Patient>(url).pipe(
      tap(_ => this.log(`fetched patients id=${id}`)),
      catchError(this.handleError<Patient>(`getPatient id=${id}`))
    );
  }

  /* GET patient whose name contains search term */
  searchPatients(term: string): Observable<Patient[]> {
    if (!term.trim()) {
      // if not search term, return empty Patient array.
      return of([]);
    }
    return this.http.get<Patient[]>(`api/patients/?name=${term}`).pipe(
      tap(_ => this.log(`found patients matching "${term}"`)),
      catchError(this.handleError<Patient[]>('searchPatients', []))
    );
  }

  //////// Save methods //////////
  addPatient (patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientUrl, patient, httpOptions).pipe(
      tap((patient: Patient) => this.log(`added patient w/ id=${patient.id}`)),
      catchError(this.handleError<Patient>('addPatient'))
    );
  }


  /** DELETE: delete the Patient from the server */
  deletePatient (patient: Patient | number): Observable<Patient> {
    const id = typeof patient === 'number' ? patient : patient.id;
    const url = `${this.patientUrl}/${id}`;

    return this.http.delete<Patient>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted patient id=${id}`)),
      catchError(this.handleError<Patient>('deletePatient'))
    );
  }

  /** PUT: update the patient on the server */
  updatePatient (patient: Patient): Observable<any> {
    return this.http.put(this.patientUrl, patient, httpOptions).pipe(
      tap(_ => this.log(`updated patient id=${patient.id}`)),
      catchError(this.handleError<any>('updatePatient'))
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

  /** Log a Patient Service message with the MessageService */
  private log(message: string) {
    this.messageService.add('PatientService: ' + message);
  }
}
