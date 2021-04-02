import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewChecked {
  loading = false;
  error;
  invitations;
  activeUser;

  constructor(private httpClient: HttpClient) {
    this.activeUser = localStorage.getItem('user');
  }

  ngOnInit() {
    this.loading = true;
    this.httpClient.get<any>('assets/data/invitations.json').subscribe(
      (data) => {
        this.invitations = data.invites.filter(
          (x) => x.user_id == this.activeUser
        );
        console.log(this.invitations);
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  updateData() {
    this.httpClient.get<any>('assets/data/invitations_update.json').subscribe(
      (data) => {
        this.invitations = data.invites.filter(
          (x) => x.user_id == this.activeUser
        );
        console.log(this.invitations);
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  toDateTime(secs) {
    let t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }
  ngAfterViewChecked() {
    setTimeout(function () {
      this.updateData();
    }, 5000);
  }
}
