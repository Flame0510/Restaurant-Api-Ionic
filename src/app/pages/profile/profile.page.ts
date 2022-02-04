import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IMe } from 'src/app/models/me';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: IMe;

  refreshTokenString: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4NDU5NCwiYWRtaW4iOmZhbHNlLCJyZXN0IjpmYWxzZSwiY29tcGFueSI6ZmFsc2UsImNoYWluIjpmYWxzZSwiaGFuZGxlciI6ZmFsc2UsImN1c3RvbWVyIjp0cnVlLCJpYXQiOjE2NDQwMDU5MTMsImV4cCI6MTY1MTc4MTkxMywiYXVkIjoid2ViLXN0YWdlLmVhdHNyZWFkeS5jb20iLCJpc3MiOiJhcGktc3RhZ2UuZWF0c3JlYWR5LmNvbSJ9.taZ7t8EVDFJyXogh5PoR5gbMsIZ8bdNvg_DHhDjxWRE';
    
  constructor(
    private apiService: ApiService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.apiService
      .me()
      .subscribe(
        (response: IMe) => ((this.userData = response), console.log(response))
      );
  }

  refreshToken = () =>
    this.apiService
      .refreshToken(this.refreshTokenString)
      .subscribe(
        ({
          accessToken,
          refreshToken,
        }: {
          accessToken: string;
          refreshToken: string;
        }) => (
          this.storage.set('accessToken', accessToken),
          this.storage.set('refreshToken', refreshToken)
        )
      );

  logout = () =>
    /* this.storage.remove('accessToken'),  */ this.router.navigate([
      'sign-in',
    ]);
}
