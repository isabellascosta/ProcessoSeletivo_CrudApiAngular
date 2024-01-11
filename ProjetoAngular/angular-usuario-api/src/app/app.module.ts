import { HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ShowUsuarioComponent } from './usuario/show-usuario/show-usuario.component';
import { AddEditComponent } from './usuario/add-edit/add-edit.component';
import { UsuarioApiService } from './usuario-api.service';
import { DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    ShowUsuarioComponent,
    AddEditComponent
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [UsuarioApiService, DatePipe, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
  
  
})
export class AppModule { }
