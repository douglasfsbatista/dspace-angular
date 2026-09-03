import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // para *ngFor, *ngIf
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ds-destaques-mes',
  templateUrl: './destaques-mes.component.html',
  styleUrls: ['./destaques-mes.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DestaquesMesComponent {
  destaquesMes = [
    {
      id: '123456',
      title: 'Passagem: Educação de Adultos, com a presença de Paulo Freire e a Prefeita Luiza Erundina',
      resumo: '',
      link: '/items/df13eb1b-d52a-4eff-a254-080178b74ad8',
      thumbnail: 'assets/images/destaques-paulo-freire/destaque-1.png'
    },
    {
      id: '789012',
      title: 'Paulo Freire com representantes do ensino da Jamaica',
      resumo: '',
      link: '/items/49c67c96-5654-40ac-a646-640075e2ae41',
      thumbnail: 'assets/images/destaques-paulo-freire/destaque-2.png'
    },
    {
      id: '789013',
      title: 'MOVA: aula inaugural com Paulo Freire',
      resumo: '',
      link: '/items/0a4372af-6483-49cf-8dcd-f106074bd053',
      thumbnail: 'assets/images/destaques-paulo-freire/destaque-3.png'
    },
    {
      id: '789014',
      title: 'I congresso de alfabetizandos da cidade de São Paulo do MOVA-SP',
      resumo: '',
      link: '/items/3e8c38ca-564d-4b1c-bccb-f3d817649d7a',
      thumbnail: 'assets/images/destaques-paulo-freire/destaque-4.png'
    }
  ];
}