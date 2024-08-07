import { Component } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrl: './buscar-imagen.component.css'
})
export class BuscarImagenComponent {
  nombreImagen:string = '';

  constructor(private _imagenService:ImagenService){}

  buscarImagenes(){

    if(this.nombreImagen === ''){
      this._imagenService.setError('Agregar un metodo de busqueda');
    return;
    }

    this._imagenService.setTerminoBusqueda(this.nombreImagen);

  }
}
