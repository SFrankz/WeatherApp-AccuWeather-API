import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from 'src/app/Models/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  searchCities(query: string) {
    console.log(this.http.get(`${this.baseUrl}/search?query=${query}`));
    return this.http.get(`${this.baseUrl}/search?query=${query}`);
  }

  getCurrentWeather(cityKey: string) {
    return this.http.get(`${this.baseUrl}/getCurrentWeather?Key=${cityKey}`);
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/favorites`);
  }

  addToFavorites(city: City) {
    return this.http.post(`${this.baseUrl}/addToFavorites`, city);
  }

  deleteFavorite(cityKey: string) {
    return this.http.delete(`${this.baseUrl}/deleteFavorite/${cityKey}`);
  }
}
