import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-video.component.html',
  styleUrls: ['./home-video.component.scss']
})
export class HomeVideoComponent {

  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/JRm-mIGRHdE'
    );
  }
}
