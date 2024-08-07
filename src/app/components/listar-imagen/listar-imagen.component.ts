import { Component } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrl: './listar-imagen.component.css'
})
export class ListarImagenComponent {
  termino:string = '';
  suscription:Subscription
  listImagenes: any[] = []
  logding:boolean = false
  imagenesPorPagina:number = 30;
  paginaActual:number = 1;
  calcularTotalPaginas:number = 0;
  

  constructor(private _imagenService: ImagenService){
   this.suscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
    this.logding = true
    this.paginaActual = 1
    this.termino = data;
    setTimeout(()=>{
      this.obtenerImagen()
    },1500) 
   })
  }

  obtenerImagen(){
    this._imagenService.getImagenes(this.termino, this.paginaActual, this.imagenesPorPagina).subscribe(data => {
      this.logding = false
      this.listImagenes = data.hits;
      
     console.log(data)
      if(data.hits.length === 0){
        this._imagenService.setError('Opss... no se encontro ningun resultado');
      }
      
      this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina)
      console.log(this.calcularTotalPaginas)
    }, error => {
      this._imagenService.setError('Opss... servidor caido');
      this.logding = false
    });
  }


  paginaAnterior(){
    this.paginaActual--;
    this.logding = true;
    this.listImagenes = []
    this.obtenerImagen()
  }
  paginaPosterior(){
    this.paginaActual++;
    this.logding = true;
    this.listImagenes = []
    this.obtenerImagen()
  }
 
  paginaActualClass(){
    if(this.paginaActual === 1){
      return false;
    }else {
      return true;
    }
  }
  paginaPosteriorClass(){
    if(this.paginaActual === this.calcularTotalPaginas){
      return false;
    }else{
      return true;
    }
  }
}
