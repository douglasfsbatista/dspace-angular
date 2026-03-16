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
      title: 'Leitura do Mundo: Ação na Educação de Jovens, Adultos e Idosos em Alto do Rodrigues (RN)',
      resumo: '',
      link: '',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-1.png'
    },
    {
      id: '789012',
      title: 'Leitura do Mundo: Ação na Educação de Jovens, Adultos e Idosos em Fortaleza (CE)',
      resumo: '',
      link: '/items/43644566-002e-4350-af5d-122b0c4ad248',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-2.png'
    },
    {
      id: '789013',
      title: 'Leitura do Mundo: Ação na Educação de Jovens, Adultos e Idosos - Escola em Alto do Cabo de Santo Agostinho (PE)',
      resumo: '',
      link: '',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-3.png'
    },
    {
      id: '789014',
      title: 'Oficina de Leitura e Escrita',
      resumo: '',
      link: '',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-4.png'
    }
  ];
}