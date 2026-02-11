import { Component } from '@angular/core';
import { BannerPauloFreireComponent } from './banner-paulo-freire/banner-paulo-freire.component';
import { InformacoesPauloFreireComponent } from './informacoes-paulo-freire/informacoes-paulo-freire.component';
import { HomeSocialComponent } from './home-social/home-social.component';
import { DestaquesMesComponent } from './destaques-mes/destaques-mes.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-paulo-freire-home',
  standalone: true,
    imports: [
      CommonModule,
      BannerPauloFreireComponent,
      InformacoesPauloFreireComponent,
      HomeSocialComponent,
      DestaquesMesComponent,
    ],
  templateUrl: './paulo-freire-home.component.html',
  styleUrls: ['./paulo-freire-home.component.scss']
})
export class PauloFreireHomeComponent {
  title = 'Paulo Freire - Home';
}