import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Conta } from 'src/app/shared/models/conta';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-conta',
  templateUrl: './cadastrar-conta.component.html',
  styleUrls: ['./cadastrar-conta.component.scss']
})
export class CadastrarContaComponent implements OnInit{

  editar;
  formGroup: FormGroup;
  nome: Cliente[] = [];

  constructor(private contaService: ContaService, private router: Router, private route: ActivatedRoute, private clienteService: ClientesService){

    console.log('Antes de criar o form')

    this.formGroup = new FormGroup({
      id: new FormControl(null),
      numero:  new FormControl('', Validators.required),
      agencia: new FormControl('', Validators.required),
      saldo: new FormControl('', Validators.required),
      cliente: new FormControl('', Validators.required)
    });

    console.log('Form criado')

    this.editar = false;

  }

  ngOnInit(): void {
    console.log('Antes no IF........')
    if(this.route.snapshot.params["id"]){
      this.editar = true;

      this.contaService.listarContaEspecifica(this.route.snapshot.params["id"]).subscribe(conta =>{
        return this.formGroup.patchValue(conta)
      })
    }

    this.clienteService.listar().subscribe(element =>{
      this.nome = element;
    })

    console.log('Passou do IF........')

  }

  cadastrarNovaConta(){
    const conta: Conta = this.formGroup.value;

    if(this.editar){

      this.contaService.atualizarContaCliente(conta).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Conta Atualizada com sucesso!',
            showConfirmButton: false,
            timer: 3500
          })
          this.router.navigate(['/conta'])
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Sua Conta não foi Atualizada!',
            showConfirmButton: true,
          })
        }
      })

    }else{
      this.contaService.inserir(conta).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Conta cadastrada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/conta'])
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Sua Conta não foi cadastrada!',
            showConfirmButton: true,
          })
        }
      })
    }
  }

}
