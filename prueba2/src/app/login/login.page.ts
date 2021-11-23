import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //formulario del login
  formularioLogin: FormGroup;

  //lista de usuario, que almacenará la consulta del correo
  //solo tendrá un registro, pues en django el email es unique = true
  UserList: {email: String, password: String}[]=[];

  constructor(
    private router: Router, 
    public alertController: AlertController, 
    private servicio:UserService) 
    { 

    //limites formulario
    this.formularioLogin= new FormGroup({
      emailUser: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8)]),
      passUser: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
    });

  }

  ngOnInit() {
  }


  //metodo que me consulta si el usuario existe, si no existe lanza mensaje de error 
  //si existe, comparará sus passwords y lo dejará entrar al sistema
  checkUser()
  {

      this.servicio.getUser(this.formularioLogin.value['emailUser']).subscribe((datos => {
        this.UserList = datos;
        console.log(this.UserList);

        try
        {
          if(this.formularioLogin.value['passUser']==this.UserList['user']['password'])
          {
            this.router.navigate(['/home/'+this.formularioLogin.value['emailUser']]);
          }
          else
          {
            this.presentAlert();
          }
  
        }
        catch(error)
        {
          this.presentAlert();

        }

      }))
            

  }


  //alerta de ionic
  async presentAlert()
  {
    const alert = await this.alertController.create({
      header:'Error',
      message:'Usuario invalido',
      buttons:["Ok"]
    });

    await alert.present();
    let result = await alert.onDidDismiss();

  }

}
