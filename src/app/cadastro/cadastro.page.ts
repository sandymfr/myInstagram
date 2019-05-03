import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { error } from '@angular/compiler/src/util';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

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
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  async mostraAlerta(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }

  async cadastro() {
    const { username, password, confirmP } = this
    if(password!==confirmP) {
      this.mostraAlerta("Erro", "As senhas informadas não são iguais!")
    }
    
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@ifal.com.br', password)
      this.afstore.doc(`usuarios/${res.user.uid}`).set({
        username
      })

      this.user.setUser({
        username,
        uid: res.user.uid
      })

      this.mostraAlerta("Sucesso","Sua conta foi cadastrada!")
      this.router.navigate(['/tabs'])

    } catch(error) {
      console.dir(error)
      this.mostraAlerta("Erro", error.message)
    } 
  }


    
}