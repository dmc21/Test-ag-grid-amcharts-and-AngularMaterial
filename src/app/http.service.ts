import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Datos } from './modelos/datos';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/graficos';

  getAll(): Observable<Datos[]> {
    return this.http.get<Datos[]>(this.url);
  }

  update(form): Observable<Datos> {
    return this.http.put<Datos>(`${this.url}/${form.id}`, form);
  }

  delete(id): Observable<Datos> {
    return this.http.delete<Datos>(`${this.url}/${id}`);
  }
}
