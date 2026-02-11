import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrejasComponent } from './crejas/crejas.component';
import { HomeSocialComponent } from './home-social/home-social.component';

@Component({
  selector: 'app-saiba-mais-creja',
  standalone: true,
      imports: [
        CommonModule,
        CrejasComponent,
        HomeSocialComponent
      ],
  templateUrl: './saiba-mais-creja.component.html',
  styleUrls: ['./saiba-mais-creja.component.scss']
})
export class SaibaMaisCrejaComponent {}
