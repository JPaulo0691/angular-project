import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CadastrarContaComponent } from './cadastrar-conta/cadastrar-conta.component';
import { ListarContasComponent } from './listar-contas/listar-contas.component';
import { DepositoComponent } from './deposito/deposito.component';
import { SaqueComponent } from './saque/saque.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

@NgModule({
  declarations: [
    CadastrarContaComponent,
    ListarContasComponent,
    DepositoComponent,
    SaqueComponent,
    TransferenciaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports: [
    CadastrarContaComponent,
    ListarContasComponent,
    DepositoComponent,
    SaqueComponent,
    TransferenciaComponent
  ]
})
export class ContasModule { }
