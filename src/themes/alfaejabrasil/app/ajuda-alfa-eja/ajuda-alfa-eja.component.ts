import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ajuda-alfa-eja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ajuda-alfa-eja.component.html',
  styleUrls: ['./ajuda-alfa-eja.component.scss']
})
export class AjudaAlfaEjaComponent {

  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/NZJbTCuWjL8?si=bVrUH6DciDHnd16w'
    );
  }
}
