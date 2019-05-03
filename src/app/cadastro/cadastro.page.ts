import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { error } from '@angular/compiler/src/util';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  username: string=""
  password: string=""
  confirmP: string=""  

  constructor( 
    public alert: AlertController, 
    public afAuth: AngularFireAuth,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async cadastro() {
    const { username, password, confirmP } = this
    if(password!==confirmP) {
      this.mostraAlerta("Erro", "As senhas informadas não são iguais!")
    }
    
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password)
      console.log(res)
      this.mostraAlerta("Sucesso","Sua conta foi cadastrada!")
      this.router.navigate(['/tabs'])

    } catch(error) {
      console.dir(error)
      this.mostraAlerta("Erro", error.message)
    } 
  }

  async mostraAlerta(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })

    await alert.present()
  }
}