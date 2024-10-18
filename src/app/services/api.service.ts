import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://starbucks-coffee-db2.p.rapidapi.com/api/recipes?category=HOT%20BEVERAGES';
  private apiUrlFood = 'https://starbucks-coffee-db2.p.rapidapi.com/api/recipes?category=FOOD';
  private headers = new HttpHeaders({
    'x-rapidapi-host': 'starbucks-coffee-db2.p.rapidapi.com',
    'x-rapidapi-key': '6e3f3bc38bmsh7e6e2a5b820850ap102d2cjsnb0d30e55cb74'
  });

  constructor(private http: HttpClient) { }

  getApi(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }
  getApiFood(): Observable<any> {
    return this.http.get(this.apiUrlFood, { headers: this.headers });
  }
}

