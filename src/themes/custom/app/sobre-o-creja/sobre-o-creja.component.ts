import { Component } from '@angular/core';

interface SocialLink {
  icon: string;
  label: string;
  url: string;
}

@Component({
  selector: 'ds-sobre-creja-page',
  templateUrl: './sobre-o-creja.component.html',
  styleUrls: ['./sobre-o-creja.component.scss'],
  standalone: true
})
export class SobreCrejaComponent {
  socialLinks: SocialLink[] = [
    {
      icon: 'assets/icons/youtube.svg',
      label: 'alfaejabrasil',
      url: 'https://www.youtube.com/alfaejabrasil'
    },
    {
      icon: 'assets/icons/instagram.svg',
      label: '@alfaejabrasil',
      url: 'https://www.instagram.com/alfaejabrasil'
    },
    {
      icon: 'assets/icons/facebook.svg',
      label: '@alfaejabrasil',
      url: 'https://www.facebook.com/alfaejabrasil'
    }
  ];
}