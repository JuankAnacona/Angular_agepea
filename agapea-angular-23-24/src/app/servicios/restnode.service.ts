import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IRestMessage } from '../modelos/restmessage';
import { ILibro } from '../modelos/libro';
import { ICategoria } from '../modelos/categoria';
import { IMunicipio } from '../modelos/municipio';
import { IProvincia } from '../modelos/provincia';
import { ICliente } from '../modelos/cliente';
import { IDireccion } from '../modelos/direccion';
import { IPedido } from '../modelos/pedido';
@Injectable({
  providedIn: 'root'
})
export class RestnodeService {
  //servicio para poder hacer pet.rest a serv.RESFTULL de nodejs....
  constructor(private _httpclient:HttpClient) { }


  //#region ------ metodos para zona Cliente ----------
public async LoginCliente(credenciales: {
    email: string;
    password: string;
  }): Promise<IRestMessage> {
    return lastValueFrom(
      this._httpclient.post<IRestMessage>('http://localhost:3000/api/Cliente/Login',
        credenciales,
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
    );
  }

  public  ComprobarEmail(email:string):Observable<IRestMessage>{
    return this._httpclient.get(`http://localhost:3000/api/Cliente/ComprobarEmail?email=${email}`) as Observable<IRestMessage>;
  }

  public ActivarCuenta(mode:string|null, oobCode:string|null, apiKey:string|null):Observable<IRestMessage>{
      return this._httpclient.get(`http://localhost:3000/api/Cliente/ActivarCuenta?mod=${mode}&cod=${oobCode}&key=${apiKey}`) as Observable<IRestMessage>;
  }

    public async UploadImagen(imagenBASE64:string, email: string): Promise<IRestMessage>  {
    return await lastValueFrom(
              this._httpclient.post<IRestMessage>(
                                                 'http://localhost:3000/api/Cliente/UploadImagen',
                                                 {imagen: imagenBASE64, emailcliente: email },
                                                 { headers: new HttpHeaders( {'Content-Type':'application/json'}) }
                                                 )
                              );
  }
  public async OperarDireccion(direccion:IDireccion, operacion:string, email:string ):  Promise<IRestMessage> {
    console.log('en servicio, metodo operardireccion, mandando...',{ direccion,operacion,email});

    return await lastValueFrom(
              this._httpclient.post<IRestMessage>(
                                                  'http://localhost:3000/api/Cliente/OperarDireccion',
                                                  { direccion, operacion, email },
                                                  { headers: new HttpHeaders( {'content-Type':'application/json'} ) }
                                                )
    );
  }

  public async UpdateDatosCliente (datos: any): Promise<IRestMessage> {
    return await lastValueFrom(
      this._httpclient.post<IRestMessage>(
        'http://localhost:3000/api/Cliente/updateDatosCliente',
        datos,
        { headers: new HttpHeaders({'Content-Type':'application/json'}) }
      ));
  }
  //#endregion

  //#region ------ metodos para zona Tienda -----------
    public RecuperarCategorias(idcat:string): Observable<ICategoria[]>{
      if(!! idcat ) idcat='raices';
      return this._httpclient.get<ICategoria[]>(`http://localhost:3000/api/Tienda/RecuperarCategorias?idcat=${idcat}`);

    }

    public  RecuperarLibros(idcat:string): Observable<ILibro[]>{
        if(!! idcat ) idcat='2-10';
        return this._httpclient.get<ILibro[]>(`http://localhost:3000/api/Tienda/RecuperarLibros?idcat=${idcat}`);
    }


    public RecuperarUnLibro(isbn:string):Observable<ILibro> {
        return this._httpclient.get<ILibro>(`http://localhost:3000/api/Tienda/RecuperarUnLibro?isbn=${isbn}`);
    }

        public RecuperarProvincias():Observable<IProvincia[]>{
        return this._httpclient.get<IProvincia[]>('http://localhost:3000/api/Tienda/RecuperarProvincias');
    }

    public RecuperarMunicipios(codpro:string):Observable<IMunicipio[]>{
      return this._httpclient.get<IMunicipio[]>(`http://localhost:3000/api/Tienda/RecuperarMunicipios?codpro=${codpro}`);
  }
   public RegistrarCliente(item: [cliente: ICliente, password:string] ):Observable<IRestMessage>{
    return this._httpclient.post<IRestMessage>(
      'http://localhost:3000/api/Cliente/RegistrarCliente',
      {body: {cliente: item[0] ,password: item[1]}},
      { 
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      ); 
    }
    public FinalizarPedido( pedido:IPedido):Promise<IRestMessage>{
    return lastValueFrom(
                      this._httpclient
                          .post<IRestMessage>(
                            "http://localhost:3000/api/Tienda/FinalizarPedido",
                            { pedido},
                            { headers: new HttpHeaders({'Content-Type':'application/json'}) }
                          )
                    );
  }
  public ConfirmarCambioContraseña(email:string, token:string, pass: string):Promise<IRestMessage>{
    return lastValueFrom(
      this._httpclient
          .get<IRestMessage>(
            `http://localhost:3000/api/Cliente/ConfirmarCambioContraseña?email=${email}&pass=${pass}&token=${token}`
          )
    );
  }
  public RecuperarDatosCliente(token:string):Promise<IRestMessage>{
    return lastValueFrom(
      this._httpclient
          .get<IRestMessage>(
            `http://localhost:3000/api/Cliente/RecuperarDatosCliente?token=${token}`
          )
    );
  }

  public BuscarLibros(busqueda: string): Observable<ILibro[]> {
    return this._httpclient.get<ILibro[]>(
      `http://localhost:3000/api/Tienda/BuscarLibros/${busqueda}`
    );
  }

  //#endregion

}
