import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async presentToast(message: string, status: string) {
    const toast = await this.toastController.create({
      message,
      icon:
        status === 'ok' ? 'checkmark-circle-outline' : 'alert-circle-outline',
      color: status === 'ok' ? 'medium' : 'danger',
      duration: 2000,
    });
    toast.present();
  }

  signUp = () =>
    this.apiService
      .signUp(this.name, this.surname, this.email, this.password, 'android')
      .subscribe(
        (response) => this.presentToast('Email di Verifica Inviata!', 'ok'),
        ({ status }: { status: number }) =>
          status === 400
            ? this.presentToast('Dati insertiti non validi', 'error')
            : this.presentToast("C'è stato un errore.. Riprova", 'error')
      );
}
