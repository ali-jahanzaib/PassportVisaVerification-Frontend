import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          // { title: 'Card 2', cols: 1, rows: 1 },
          // { title: 'Card 3', cols: 1, rows: 1 },
          // { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        // { title: 'Card 2', cols: 1, rows: 1 },
        // { title: 'Card 3', cols: 1, rows: 2 },
        // { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
  title = 'ng-carousel-demo';
   
  images = [
    {title: 'Passport', short: 'Passport', src: "/assets/Sample-Passport-Image.jpg"},
    {title: 'Visa', short: 'Visa', src: "/assets/Sample-Visa-Image.jpg"},
    {title: 'Passport Office', short: 'Passport Office', src: "/assets/Passport-office-1.jpg"},
    {title: 'Passport Office 2', short: 'Passport Office', src: "/assets/Passport-office-2.jpg"}
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    public config: NgbCarouselConfig) {
      config.interval = 3000;
      config.keyboard = true;
      config.pauseOnHover = true;
    }
}
