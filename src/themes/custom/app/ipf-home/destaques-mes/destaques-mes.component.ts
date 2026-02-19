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
      title: 'O Sujeito irreverente',
      resumo: '',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-1.png'
    },
    {
      id: '789012',
      title: 'Que e como é necessário aprender',
      resumo: '',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-2.png'
    },
    {
      id: '789013',
      title: 'Alfabetização inicial de jovens, adultos e idosos: a ousadia de fazer e o dever de mostrar',
      resumo: '',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-3.png'
    },
    {
      id: '789014',
      title: 'Confintea - Brasil +6 -Fóruns EJA Brasil - Moacir Gadotti e Almerico Biondi',
      resumo: '',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-4.png'
    }
  ];
}