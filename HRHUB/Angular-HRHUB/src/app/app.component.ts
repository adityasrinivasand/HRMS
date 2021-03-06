import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader = true;
  showNavbar = false;
  showFooter = false;
  showWelcomeCard = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
        this.showNavbar = this.activatedRoute.firstChild.snapshot.data.showNavbar !== false;
        this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
        this.showWelcomeCard = this.activatedRoute.firstChild.snapshot.data.showWelcomeCard !== false;
      }
    });
    const value: string = this.cookieService.get('Token');
    if(value != null){
      this.router.navigate['/contacts'];
    }else if(value == null){
      this.router.navigate['/login'];
    }
  }

}
