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
      title: 'Flecha - Jullyana Cariri',
      resumo: 'O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão.',
      thumbnail: 'https://museudapessoa.org/wp-content/uploads/avatar67f68ca59fe2c.png'
    },
    {
      id: '789012',
      title: 'Uma forma poética de resistência',
      resumo: 'O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão.',
      thumbnail: 'https://museudapessoa.org/wp-content/uploads/avatar/20250411192204Patr%C3%ADcia%20Roberta%20(2)%20(1).jpeg'
    },
    {
      id: '789013',
      title: 'História de vida, Maria Crescência, 98 anos',
      resumo: 'O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão.',
      thumbnail: 'https://img.youtube.com/vi/GI9EWJO-CU8/hqdefault.jpg'
    },
    {
      id: '789014',
      title: 'Takoramono',
      resumo: 'O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão.',
      thumbnail: 'https://museudapessoa.org/wp-content/uploads/avatar/20250425175453Screenshot_20250419_221345_Chrome.jpg'
    }
  ];
}