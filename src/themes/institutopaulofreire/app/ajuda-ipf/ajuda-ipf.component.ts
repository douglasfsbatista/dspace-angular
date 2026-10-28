import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-ajuda-ipf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ajuda-ipf.component.html',
  styleUrls: ['./ajuda-ipf.component.scss'],
})
export class AjudaIpfComponent {

  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/Z0vC9iw_f5w',
    );
  }
}
