import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private error$ = new Subject<string>;
  private terminiBusqueda$ = new Subject<string>;
  http = inject(HttpClient);
  url: string = 'https://pixabay.com/api/'
  key: string = '36018845-09cec70273603d362a71a4cdf'
  constructor() { }

  setError(mensaje:string){
    this.error$.next(mensaje);
  }
  getError():Observable <string>{
    return this.error$.asObservable();
  }

  setTerminoBusqueda(termino:string){
    this.terminiBusqueda$.next(termino);
  }

  getTerminoBusqueda():Observable <string>{
    return this.terminiBusqueda$.asObservable();
  }

  getImagenes(termino:string, paginaActual:number, cantidadPorPagina:number):Observable <any>{
   return this.http.get(this.url + '?key=' + this.key + '&q=' + termino + '&per_page=' + cantidadPorPagina + '&page=' + paginaActual );
  }
}
