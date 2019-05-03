import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  imageURL: string
  descricao: string

  @ViewChild('fileButton') fileButton

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    private alert: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  criarPost() {
    const imagem = this.imageURL
    const descricao = this.descricao

    this.afstore.doc(`usuarios/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion({
        imagem, 
        descricao
      })
    })
  }

  fazUpload() {
    this.fileButton.nativeElement.click()
  }

  fileChanged(event) {
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'b007e583346ec80d17c4')

    this.http.post('https://upload.uploadcare.com/base/', data).subscribe(event => {
      console.log(event)
      this.imageURL = event.json().file
    })
  }



}
