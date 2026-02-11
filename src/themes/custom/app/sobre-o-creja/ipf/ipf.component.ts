import { Component } from '@angular/core';

interface SocialLink {
  icon: string;
  label: string;
  url: string;
}

@Component({
  selector: 'ds-ipf-page',
  templateUrl: './ipf.component.html',
  styleUrls: ['./ipf.component.scss'],
  standalone: true
})
export class IpfComponent {
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