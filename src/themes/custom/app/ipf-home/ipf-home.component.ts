import { Component } from '@angular/core';
import { BannerIpfComponent } from './banner-ipf/banner-ipf.component';
import { InformacoesIpfComponent } from './informacoes-ipf/informacoes-ipf.component';
import { HomeSocialComponent } from './home-social/home-social.component';
import { DestaquesMesComponent } from './destaques-mes/destaques-mes.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-ipf-home',
  standalone: true,
    imports: [
      CommonModule,
      BannerIpfComponent,
      InformacoesIpfComponent,
      HomeSocialComponent,
      DestaquesMesComponent,
    ],
  templateUrl: './ipf-home.component.html',
  styleUrls: ['./ipf-home.component.scss']
})
export class IpfHomeComponent {
  title = 'IPF - Home';
}