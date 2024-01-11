import { Component,Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { Observable } from 'rxjs';
import { UsuarioApiService } from 'src/app/usuario-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})

export class AddEditComponent implements OnInit {
  formulario!: FormGroup;
  @Input() usuario:any;
  


  usuarioList$!: Observable<any[]>;
  constructor(private service: UsuarioApiService, private formBuilder: FormBuilder,private snackBar: MatSnackBar) { }
  id:number=0;
  nome: string="";
  sobrenome:string="";
  email: string="";
  dataNascimento!: Date ;
  escolaridade!: number;


  ngOnInit(): void {
    
    this.id = this.usuario.id;
    this.nome = this.usuario.nome;
    this.sobrenome = this.usuario.sobrenome;
    this.email= this.usuario.email;
    this.dataNascimento=this.usuario.dataNascimento;
    this.escolaridade = this.usuario.escolaridade;
    this.usuarioList$ = this.service.getUsuarioList();
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],  
      dataNascimento:['',[Validators.required]],
      escolaridade: ['', [Validators.required]],
    });
  }
  
  addUsuario()
  {
    if(!this.formulario.get('email')?.hasError('email')){   
        const escolaridadeNumber: number = +this.escolaridade;
        var usuario={
          nome:this.nome,
          sobrenome:this.sobrenome,
          email:this.email,
          dataNascimento:this.dataNascimento,
          escolaridade: escolaridadeNumber 
        }
    
        this.service.addUsuario(usuario).subscribe(res =>{
          var closeModalBtn = document.getElementById('add-edit-modal-close')
          if(closeModalBtn){
            closeModalBtn.click();
          }
          var showAddSucess = document.getElementById('add-sucess-alert')
          if(showAddSucess)
          {
            showAddSucess.style.display="block";
          }
          setTimeout(function(){
            if(showAddSucess){
              showAddSucess.style.display="none";
            }
          },4000)
        })
       }
    else{
      this.snackBar.open('Formato de e-mail incorreto','Fechar');
    }
  }
  updateUsuario()
  {
    const escolaridadeNumber: number = +this.escolaridade;
    var usuario={
     id:this.id,
     nome:this.nome,
     sobrenome:this.sobrenome,
     email:this.email,
     dataNascimento:this.dataNascimento,
     escolaridade: escolaridadeNumber 
     }
      var id:number = this.id;
      this.service.updateUsuario(id,usuario).subscribe(res =>{
      var closeModalBtn = document.getElementById('add-edit-modal-close')
       if(closeModalBtn){
          closeModalBtn.click();
        }
        var showUpdateSucess = document.getElementById('update-sucess-alert')
        if(showUpdateSucess)
        {
          showUpdateSucess.style.display="block";
        }
         setTimeout(function(){
        if(showUpdateSucess){
          showUpdateSucess.style.display="none";
        }
      },4000)
    })
  }
}
