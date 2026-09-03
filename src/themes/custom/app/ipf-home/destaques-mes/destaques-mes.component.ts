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
      link: '/items/32f56262-f7bf-4cde-b763-96c47d631e8d',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-1.png'
    },
    {
      id: '789012',
      title: 'Que e como é necessário aprender',
      resumo: '',
      link: '/items/fe084514-0fd5-40f3-9a80-7da4559d505f',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-2.png'
    },
    {
      id: '789013',
      title: 'Alfabetização inicial de jovens, adultos e idosos: a ousadia de fazer e o dever de mostrar',
      resumo: '',
      link: '/items/3ad3b625-d578-45e1-9866-51b0eaf0a0de',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-3.png'
    },
    {
      id: '789014',
      title: 'Confintea - Brasil +6 -Fóruns EJA Brasil - Moacir Gadotti e Almerico Biondi',
      resumo: '',
      link: '/items/25145554-64f7-4ed5-a159-7869c34c3c47',
      thumbnail: 'assets/images/destaques-alfaeja/destaque-4.png'
    }
  ];
}