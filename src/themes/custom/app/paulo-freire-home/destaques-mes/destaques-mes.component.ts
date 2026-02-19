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
      thumbnail: 'assets/images/destaques-paulo-freire/destaque-1.png'
    },
    {
      id: '789012',
      title: 'Paulo Freire com representantes do ensino da Jamaica',
      resumo: '',
      thumbnail: 'assets/images/destaques-paulo-freire/destaque-2.png'
    },
    {
      id: '789013',
      title: 'MOVA: aula inaugural com Paulo Freire',
      resumo: '',
      thumbnail: 'assets/images/destaques-paulo-freire/destaque-3.png'
    },
    {
      id: '789014',
      title: 'I congresso de alfabetizandos da cidade de São Paulo do MOVA-SP',
      resumo: '',
      thumbnail: 'assets/images/destaques-paulo-freire/destaque-4.png'
    }
  ];
}