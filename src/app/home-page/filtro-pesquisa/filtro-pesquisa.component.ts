import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // para *ngFor, *ngIf
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ds-filtro-pesquisa',
  templateUrl: './filtro-pesquisa.component.html',
  styleUrls: ['./filtro-pesquisa.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FiltroPesquisaComponent {
  filtros = [
    {
      nome: 'Autor',
      aberto: false,
      opcoes: [
        { nome: 'Maria Silva', qtd: 12 },
        { nome: 'João Souza', qtd: 8 },
        { nome: 'Ana Costa', qtd: 5 },
      ]
    },
    {
      nome: 'Data de Publicação',
      aberto: true,
      opcoes: [
        { nome: '2025', qtd: 3634 },
        { nome: '2024', qtd: 5691 },
        { nome: '2023', qtd: 23 },
        { nome: '2022', qtd: 4 },
      ]
    },
    {
      nome: 'Tipo de Documento',
      aberto: false,
      opcoes: [
        { nome: 'Áudio', qtd: 12 },
        { nome: 'Imagem', qtd: 8 },
        { nome: 'Texto', qtd: 5 },
        { nome: 'Vídeo', qtd: 8 },
      ]
    },
    {
      nome: 'Assunto',
      aberto: false,
      opcoes: [
        { nome: 'Assunto 01', qtd: 12 },
        { nome: 'Assunto 02', qtd: 8 },
        { nome: 'Assunto 03', qtd: 5 },
      ]
    },
    // Adicione mais filtros conforme necessário
  ];

  toggle(filter: any) {
    filter.aberto = !filter.aberto;
  }
}