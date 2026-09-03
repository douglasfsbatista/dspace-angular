import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-paulo-freire',
  standalone: true,   // 👈 ESSENCIAL
  imports: [CommonModule, RouterModule],  // 👈 para usar ngStyle e routerLink
  templateUrl: './banner-paulo-freire.component.html',
  styleUrls: ['./banner-paulo-freire.component.scss']
})
export class BannerPauloFreireComponent {

  @Input() imageUrl: string = '';
  @Input() height: string = '650px';

}
