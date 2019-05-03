import { setDefaultService } from 'selenium-webdriver/edge';
import { Injectable, Inject } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'


interface user {
    username: string,
    uid: string
}

@Injectable()

export class UserService {
    private user: user

    constructor(private afAuth: AngularFireAuth) {}

    setUser(user: user) {
        this.user = user;
    }

    getUID() {
        return this.user.uid
        
        if(!this.user) {
            if(this.afAuth.auth.currentUser) {
                const user = this.afAuth.auth.currentUser
                this.setUser({
                    username: user.email.split('0')[0],
                    uid: user.uid
                })
                return user.uid
            } else {
                throw new Error("Usuário não está logado!")
            }
        } 
            else {
                return this.user.uid
            }
    }
}
