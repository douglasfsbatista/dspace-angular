import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'carrossel-banners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrossel-banners.component.html',
  styleUrls: ['./carrossel-banners.component.scss']
})
export class CarrosselBannersComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Input() intervalTime = 5000;
  currentIndex = 0;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = interval(this.intervalTime).subscribe(() => this.next());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goTo(index: number): void {
    this.currentIndex = index;
  }
}