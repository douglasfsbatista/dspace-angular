import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-ajuda-paulo-freire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ajuda-paulo-freire.component.html',
  styleUrls: ['./ajuda-paulo-freire.component.scss'],
})
export class AjudaPauloFreireComponent {

  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/kca3UnVZHQ8?si=hrLlbPN5wVax22dW',
    );
  }
}
