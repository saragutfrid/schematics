// #docregion template
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyData9Service {
  constructor(private http: HttpClient) { }
}