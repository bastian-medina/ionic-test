import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  // email que guardará desde el routing, quien inició sesión
  email: string="";

  //formulario de validacion de contraseñas
  formChangePassword: FormGroup;


  constructor(private router: ActivatedRoute,
    public alertController: AlertController, 
    private servicio:UserService, 
    private routerD:Router) {

    //guardo la variable
    this.email = this.router.snapshot.params['email'];

    //limito el formulario
    this.formChangePassword= new FormGroup({
      passUser: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      checkPassUser: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
    });
  }


  ngOnInit() {
  }

  //metodo que lanza una alerta si las password son iguales y actualiza
  //sino, lanza el metodo errorAlert()
  async checkDesition(){

    if(this.formChangePassword.value['checkPassUser'] == this.formChangePassword.value['passUser']){
      
      //alert de confirmacion
      const alert = await this.alertController.create({
        header: "Cambiar contraseña",
        message: "¿Estas seguro?",
        buttons: [
          {
            text:'No',
            handler: () => {
              console.log('no')
            }
          },
          {
            text:'Si',
            handler: () => {
              this.updateUser();
            }
          }
        ]
      });
  
      await alert.present();
      let result = await alert.onDidDismiss();
    }
    else{
      this.errorAlert();
    }


  }

  //metodo que guarda al usuario, actualiza y luego redirige al login
  updateUser(){
    var user={
      email: this.email,
      password: this.formChangePassword.value['passUser']
    }

    this.servicio.putUser(this.email, user).subscribe((respuesta)=>{
      console.log(respuesta);
      this.succesAlert();
      this.routerD.navigate(['/login']);
    })
  }

  //alerta de exito
  async succesAlert()
  {
    const alert = await this.alertController.create({
      header:'Cambiada',
      message:'Su contraseña ha sido cambiado',
      buttons:["Ok"]
    });

    await alert.present();
    let result = await alert.onDidDismiss();

  }

  //alerta de error
  async errorAlert()
  {
    const alert = await this.alertController.create({
      header:'Error',
      message:'Las contraseñas no coinciden',
      buttons:["Ok"]
    });

    await alert.present();
    let result = await alert.onDidDismiss();

  }

}
