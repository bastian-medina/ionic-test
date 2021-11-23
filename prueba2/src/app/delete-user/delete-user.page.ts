import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements OnInit {

  email: string="";

  constructor(private router: ActivatedRoute, 
    public alertController: AlertController,
    private servicio: UserService,
    private routerD:Router) {

    this.email = this.router.snapshot.params['email'];

  }


  ngOnInit() {
  }

  async checkDesition(){

    const alert = await this.alertController.create({
      header: "Eliminar cuenta",
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
            this.deleteUser();
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();


  }

  deleteUser(){
    try{
      this.servicio.deleteUser(this.email).subscribe((respuesta)=>{
        console.log(respuesta);
        this.succesAlert();
        this.routerD.navigate(['/login']);
      })
    }
    catch(error){

    }
  }

    //alerta de exito
    async succesAlert()
    {
      const alert = await this.alertController.create({
        header:'Eliminar',
        message:'Su cuenta ha sido eliminada',
        buttons:["Ok"]
      });
  
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }
  

}
