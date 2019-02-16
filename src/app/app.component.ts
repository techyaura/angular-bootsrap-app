import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private appService: AppService
  ) {}

  isLoggedIn: Boolean = false;
  session = {};

  ngOnInit() {
    this.isLoggedIn = this.appService.isLoggedIn() ? true : false;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    )
    .subscribe(event => this.titleService.setTitle(event['title']));

    /**Scroll up when the user navigate */
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.session = this.appService.getSession();
  }

  logOut() {
    this.isLoggedIn = false;
    this.appService.logout().then(status => {
      this.router.navigate(['/auth/login']);
    });
  }
}
