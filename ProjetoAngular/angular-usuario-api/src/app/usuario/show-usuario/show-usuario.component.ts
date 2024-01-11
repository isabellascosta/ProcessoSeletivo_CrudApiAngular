import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioApiService } from 'src/app/usuario-api.service';

@Component({
  selector: 'app-show-usuario',
  templateUrl: './show-usuario.component.html',
  styleUrls: ['./show-usuario.component.css']
})
export class ShowUsuarioComponent implements OnInit {

  UsuarioList$!:Observable<any[]>;
  
  constructor(private service:UsuarioApiService) { }

  ngOnInit(): void {
    this.UsuarioList$=this.service.getUsuarioList();
  }
  //variavel(propriedades)
  modalTitle:string='';
  activeAddEditUsuarioComponent:boolean = false;
  tausuario:any;

  modalAdd(){
    this.tausuario = {
      id:0,
      nome:null,
      sobrenome:null,
      email:null,
      dataNascimento:null,
      escolaridade: null,
    }
    this.modalTitle = "Novo Usuario";
    this.activeAddEditUsuarioComponent= true;
  }
  modalEdit(item:any){
    this.tausuario = { ...item, dataNascimento: new Date(item.dataNascimento) };
    this.modalTitle="Edição de usuario";
    this.activeAddEditUsuarioComponent=true;
  }
  modalDelete(item:any){
    if(confirm(`Você tem certeza que quer deletar a tarefa ${item.id}?`)){
      this.service.deleteUsuario(item.id).subscribe(res =>{
        var closeModalBtn = document.getElementById('add-edit-modal-close')
        if(closeModalBtn){
          closeModalBtn.click();
        }
        var showDeleteSucess = document.getElementById('delete-sucess-alert')
        if(showDeleteSucess)
        {
          showDeleteSucess.style.display="block";
        }
        setTimeout(function(){
          if(showDeleteSucess){
            showDeleteSucess.style.display="none";
          }
        },4000)
      })
    }
    
  }
  modalClose(){
    this.activeAddEditUsuarioComponent=false;
    this.UsuarioList$ = this.service.getUsuarioList();
  }

  formatarData(dataNascimento: Date | string): string {
    if (typeof dataNascimento === 'string') {
      dataNascimento = new Date(dataNascimento);
    }
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('pt-BR', options).format(dataNascimento);
  }

}
