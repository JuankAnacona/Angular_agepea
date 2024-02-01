import { Component, Inject } from '@angular/core';
import { MI_TOKEN_SERVICIOSTORAGE } from '../../../servicios/injectiontokenstorageservices';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ILibro } from '../../../modelos/libro';
import { Observable } from 'rxjs';
import { IProvincia } from '../../../modelos/provincia';
import { RestnodeService } from '../../../servicios/restnode.service';

@Component({
  selector: 'app-mostrarpedido',
  templateUrl: './mostrarpedido.component.html',
  styleUrl: './mostrarpedido.component.css'
})
export class MostrarpedidoComponent {

  public listaItems$!:Observable<{libroElemento:ILibro, cantidadElemento:number}[]>;
  public listaProvincias$!:Observable<IProvincia[]>;
  public showcompdatosfacturacion: boolean = false;
  public datospago: any = {};
  

   constructor( @Inject(MI_TOKEN_SERVICIOSTORAGE) private storageSvc:IStorageService ,
   private restSvc:RestnodeService){
      this.listaItems$=storageSvc.RecuperarElementosPedido();
      this.listaProvincias$=restSvc.RecuperarProvincias();
      
   }

      ShowCompDatosFacturacion(valor:boolean){
    this.showcompdatosfacturacion=valor;
   }


   ModficarItemPedido( item:[{libroElemento: ILibro, cantidadElemento:number}, operacion:string] ){
        let _libro:ILibro=item[0].libroElemento;
      let _cantidad: number=item[0].cantidadElemento;

    this.storageSvc.OperarElementosPedido(_libro,_cantidad, item[1] != 'borrar' ? 'modificar' : 'borrar')
   }
}