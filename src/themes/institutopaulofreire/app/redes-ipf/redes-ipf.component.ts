import { Component } from '@angular/core';
import { HomeSocialComponent } from '../../../custom/app/ipf-home/home-social/home-social.component';

@Component({
  selector: 'ds-redes-ipf-page',
  templateUrl: './redes-ipf.component.html',
  styleUrls: ['./redes-ipf.component.scss'],
  standalone: true,
  imports: [
    HomeSocialComponent,
  ],
})
export class RedesIpfComponent {
}
