import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //formulario para almacenar al usuario
  formularioRegister: FormGroup;

  constructor(private servicio:UserService,
     public alertController: AlertController,
     private router: Router) {

      //limito formulario
      this.formularioRegister= new FormGroup({
      emailUser: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8)]),
      passUser: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
    });
   }

  ngOnInit() {
  }



  //metodo que guarda al usuario, si existe, lanza mensaje de error
  //sino existe, lo guarda y lo redirige al login con mensaje de exito 
  createUser(){

    try
    {

      var user={
        email: this.formularioRegister.value['emailUser'],
        password: this.formularioRegister.value['passUser']
      }

      this.servicio.postUser(user).subscribe((success)=>{
        this.successAlert();
      }, error =>{
        this.failAlert();
      })


    }
    catch(error)
    {
      this.failAlert();
    }
  }

  //mensaje de que el usuario ya existe
  async failAlert()
  {
    const alert = await this.alertController.create({
      header:'Error',
      message:'Usuario ya registrado',
      buttons:["Ok"]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);

  }

  //mesaje de que el usuario fue agregado
  async successAlert()
  {
    const alert = await this.alertController.create({
      header:'Felicitaciones',
      message:'Ya estás registrado',
      buttons:["Ok"]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);

    this.router.navigate(['/login']);

  }

}
