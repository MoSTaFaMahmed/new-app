import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Banners } from '@core/models/banner.model';
import { Categories } from '@core/models/Categories.model';
import { Courses } from '@core/models/courses.model';
import { Sliders } from '@core/models/sliders.model';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {
  private baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) {}

  getBanners(): Observable<Banners> {
    return this.http.get<Banners>(`${this.baseUrl}/2c9281eddfb0e4be229b`);
  }

  getSliders(): Observable<Sliders> {
    return this.http.get<Sliders>(`${this.baseUrl}/8494c045d50509ba0d5a`);
  }

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(`${this.baseUrl}/8378472d08789a9cb165`);
  }

  getCourses(): Observable<Courses> {
    return this.http.get<Courses>(`${this.baseUrl}/983f88db4d99fec8edd9`);
  }


}
