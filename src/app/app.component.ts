import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private storage: Storage) {}

  async ngOnInit() {
    this.storage.create();

    console.log(await this.storage.get('refreshToken'));

    this.router.navigate([
      (await this.storage.get('accessToken')) ? 'profile' : 'sign-in',
    ]);
  }
}
