import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from 'src/app/Models/city.model';
import { WeatherService } from '../weather.service';

export interface Weather {
  Key: string;
  LocalizedName: string;
  temperature: number;
  weatherText: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  cities: City[] = [];
  weather: Weather | null = null;
  favoriteCities: City[] = [];

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService
  ) {}

  search(): void {
    this.weatherService.searchCities(this.query).subscribe({
      next: (cities: any) => {
        this.cities = cities;
      },
      error: (response) => {
        console.error(response);
      },
    });
  }

  getWeather(city: City): void {
    if (city && city.Key) {
      this.weatherService.getCurrentWeather(city.Key).subscribe({
        next: (weather: any) => {
          this.weather = {
            Key: city.Key,
            LocalizedName: city.LocalizedName,
            temperature: weather.temperature,
            weatherText: weather.weatherText,
          };
        },
        error: (response) => {
          console.error(response);
        },
      });
    }
  }


  addToFavorites(city: City): void {
    this.weatherService.addToFavorites(city).subscribe((res) => {
      console.log({ city }, this.favoriteCities);
      const existingCity = this.favoriteCities.find((c) => c.Key === city.Key);
      console.log({ existingCity });
      if (!existingCity) {
        this.favoriteCities.push(city);
      }
    });
  }

  removeFromFavorites(city: City): void {
    this.weatherService.deleteFavorite(city.Key).subscribe(
      () => {
        const index = this.favoriteCities.findIndex((c) => c.Key === city.Key);
        if (index !== -1) {
          this.favoriteCities.splice(index, 1);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
