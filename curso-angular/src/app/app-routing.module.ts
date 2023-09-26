import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemUsuarioComponent } from './pages/clientes/listagem-usuario/listagem-usuario.component';
import { CadastroClienteComponent } from './pages/clientes/cadastro-cliente/cadastro-cliente.component';
import { ListarContasComponent } from './pages/contas/listar-contas/listar-contas.component';
import { CadastrarContaComponent } from './pages/contas/cadastrar-conta/cadastrar-conta.component';
import { SaqueComponent } from './pages/contas/saque/saque.component';
import { TransferenciaComponent } from './pages/contas/transferencia/transferencia.component';
import { DepositoComponent } from './pages/contas/deposito/deposito.component';

const routes: Routes = [

  {
    path: 'clientes',
    children:[
      {
        path: 'novo',
        component: CadastroClienteComponent
      },
      {
        path:'editar/:id',
        component: CadastroClienteComponent
      },
      {
        path:'',
        component: ListagemUsuarioComponent
      },

    ]
  },

  {
    path:'conta',
    children: [
      {
        path: 'nova',
        component: CadastrarContaComponent
      },
      {
        path: 'atualizarConta/:id',
        component: CadastrarContaComponent
      },
      {
        path: 'deposito',
        component: DepositoComponent
      },
      {
        path: 'saque',
        component: SaqueComponent
      },
      {
        path: 'transferencia',
        component: TransferenciaComponent
      },
      {
        path: '',
        component: ListarContasComponent
      }
    ]
  },
  {
    path:'',
    component: ListagemUsuarioComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
