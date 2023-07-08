import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Weather {
  cityKey: string;
  temperature: number;
  weatherText: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  weather: Weather | null = null;

  constructor(private http: HttpClient) {}

}
