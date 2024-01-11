import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {
//Usuarios
  readonly usuarioAPIUrl= "https://localhost:7289/api" 
  constructor(private http:HttpClient) { }
  getUsuarioList():Observable<any[]>{
    return this.http.get<any>(this.usuarioAPIUrl + '/usuarios')
  }
  addUsuario(data:any){
    return this.http.post(this.usuarioAPIUrl + '/usuarios',data)
  }
  updateUsuario(id: number | string, data:any){
    return this.http.put(this.usuarioAPIUrl + `/usuarios/${id}`,data)
  }
  deleteUsuario(id: number |string){
    return this.http.delete(this.usuarioAPIUrl + `/usuarios/${id}`)
  }
 
    // ... outros métodos do serviço
  
    
        
      
}
