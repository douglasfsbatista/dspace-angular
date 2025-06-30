import { Component } from '@angular/core';

@Component({
  selector: 'ds-redes-page',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.scss'],
  standalone: true
})
export class RedesComponent {
  redes = [
    {
      title: 'Fóruns de EJA',
      url: 'https://www.google.com.br',
      icon: 'assets/images/foruns-de-eja.svg'
    },
    {
      title: 'Memorial MOVA Brasil',
      url: 'https://www.google.com.br',
      icon: 'assets/images/memorial-mova-brasil.svg'
    },
    {
      title: 'Cremeja',
      url: 'https://www.google.com.br',
      icon: 'assets/images/cremeja.svg'
    }
  ];
}