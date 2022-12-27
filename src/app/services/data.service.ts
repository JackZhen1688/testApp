import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from './interface-page';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  hostURL:string = "http://localhost:8080/RegistrationApp";

  constructor(private url: string, private http: HttpClient) { }

  getPhoneTypes(): Observable<any>{
    //return this.http.get(this.url+"/phonetype.json");
    return this.http.get(this.hostURL+"/phoneTypes")
  } 
  getPhoneType() {
    return this.http.get(this.hostURL+"/phoneTypes").toPromise();
  }

  getFlag() {
     return this.http.get(this.url+"/flag.json").toPromise();
  } 

  async getAsyncData():Promise<boolean> {
     return await this.http.get<boolean>(this.url+"/flag.json").toPromise();
  }

  
  postData(filter:string, frmValue: any): Observable<any>{
    console.log("###### URL==="+filter)
    return this.http.post(this.hostURL+"/tset/"+filter, frmValue);
  } 

}

