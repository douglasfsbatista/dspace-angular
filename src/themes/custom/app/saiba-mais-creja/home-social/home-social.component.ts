import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-social.component.html',
  styleUrls: ['./home-social.component.scss']
})
export class HomeSocialComponent {

  @Input() backgroundColor: string = '#b71c3a';
  @Input() textColor: string = '#ffffff';

}
