import { setDefaultService } from 'selenium-webdriver/edge';
import { Injectable, Inject } from '@angular/core'

interface user {
    username: string,
    uid: string
}

@Injectable()

export class UserService {
    private user: user

    constructor() {
    }

    setUser(user: user) {
        this.user = user;
    }

    getId() {
        return this.user.uid;
    }
}
