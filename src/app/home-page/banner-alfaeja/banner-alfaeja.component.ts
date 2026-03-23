import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner-alfaeja',
  standalone: true,   // 👈 ESSENCIAL
  imports: [CommonModule, RouterModule],  // 👈 para usar ngStyle
  templateUrl: './banner-alfaeja.component.html',
  styleUrls: ['./banner-alfaeja.component.scss']
})
export class BannerAlfaejaComponent {

  @Input() imageUrl: string = '';
  @Input() height: string = '650px';

}
