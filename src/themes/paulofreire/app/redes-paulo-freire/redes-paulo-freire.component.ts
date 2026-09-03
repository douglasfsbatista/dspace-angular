import { Component } from '@angular/core';
import { HomeSocialComponent } from '../../../custom/app/paulo-freire-home/home-social/home-social.component';

@Component({
  selector: 'ds-redes-paulo-freire-page',
  templateUrl: './redes-paulo-freire.component.html',
  styleUrls: ['./redes-paulo-freire.component.scss'],
  standalone: true,
  imports: [
    HomeSocialComponent,
  ],
})
export class RedesPauloFreireComponent {
}
