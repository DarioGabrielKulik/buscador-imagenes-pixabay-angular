import { Component, OnDestroy } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnDestroy{
  texto:string = '';
  mostrar:boolean = false
  suscription:Subscription

  constructor(private _imagenService:ImagenService){
    this.suscription = this._imagenService.getError().subscribe(data => 
    {
      this.mostrarMensaje()
      this.texto = data;
    }
    )
  }

  

  mostrarMensaje(){
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    },3000)
  }

  ngOnDestroy(): void {
      if(this.suscription){
        this.suscription.unsubscribe;
      }
  }
}
