import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //guardará el email para luego ser usado 
  //en los metodos posteriores a el
  email: string="";

  constructor(private router: ActivatedRoute) {

    //captura el email
    this.email = this.router.snapshot.params['email'];

  }

}
