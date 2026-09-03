import { Component } from '@angular/core';
import { HomeSocialComponent } from '../creja-home/home-social/home-social.component';

@Component({
  selector: 'ds-redes-creja-page',
  templateUrl: './redes-creja.component.html',
  styleUrls: ['./redes-creja.component.scss'],
  standalone: true,
  imports: [
    HomeSocialComponent,
  ],
})
export class RedesCrejaComponent {
  redes = [
    {
      title: 'Fóruns de EJA',
      url: 'https://forumeja.org.br/',
      icon: 'assets/images/foruns-de-eja.svg'
    },
    {
      title: 'Memorial MOVA Brasil',
      url: 'https://memorial.movabrasil.org.br/',
      icon: 'assets/images/memorial-mova-brasil.svg'
    },
    {
      title: 'Cremeja',
      url: 'https://cremeja.org/a7/',
      icon: 'assets/images/cremeja.svg'
    }
  ];
}
