import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  email: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router,
    private storage: Storage
  ) {}

  async presentToast(message: string, status: string) {
    const toast = await this.toastController.create({
      message,
      icon: (status = 'ok'
        ? 'checkmark-circle-outline'
        : 'alert-circle-outline'),
      color: status === 'ok' ? 'medium' : 'danger',
      duration: 2000,
    });
    toast.present();
  }

  signIn = () =>
    this.apiService.signIn(this.email, this.password).subscribe(
      ({
        accessToken,
        refreshToken,
      }: {
        accessToken: string;
        refreshToken: string;
      }) => (
        this.storage.set('accessToken', accessToken),
        this.storage.set('refreshToken', refreshToken),
        this.presentToast('Login Effettuato!', 'ok'),
        this.router.navigate(['profile'])
      ),
      ({ status }: { status: number }) =>
        status === 400
          ? this.presentToast('Credenziali Errate', 'error')
          : this.presentToast("C'è stato un problema. Riprova", 'error')
    );
}
