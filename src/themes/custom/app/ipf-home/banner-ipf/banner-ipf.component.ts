import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-ipf',
  standalone: true,   // 👈 ESSENCIAL
  imports: [CommonModule],  // 👈 para usar ngStyle
  templateUrl: './banner-ipf.component.html',
  styleUrls: ['./banner-ipf.component.scss']
})
export class BannerIpfComponent {

  @Input() imageUrl: string = '';
  @Input() height: string = '650px';

}
