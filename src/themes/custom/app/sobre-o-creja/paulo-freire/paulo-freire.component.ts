import { Component } from '@angular/core';

interface SocialLink {
  icon: string;
  label: string;
  url: string;
}

@Component({
  selector: 'ds-paulo-freire-page',
  templateUrl: './paulo-freire.component.html',
  styleUrls: ['./paulo-freire.component.scss'],
  standalone: true
})
export class PauloFreireComponent {
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