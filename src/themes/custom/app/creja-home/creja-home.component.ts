import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { CrejasComponent } from './crejas/crejas.component';
import { HomeVideoComponent } from './home-video/home-video.component';
import { HomeSocialComponent } from './home-social/home-social.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-creja-home',
  standalone: true,
    imports: [
      CommonModule,
      BannerComponent,
      CrejasComponent,
      HomeVideoComponent,
      HomeSocialComponent,
    ],
  templateUrl: './creja-home.component.html',
  styleUrls: ['./creja-home.component.scss']
})
export class CrejaHomeComponent {
  title = 'Creja - Home';
}