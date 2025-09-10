import { CurrencyPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Movie } from '../../core/models/movie.models';
import { FormatDecimalPipe } from '../../shared/pipes/format-decimal.pipe';

@Component({
  selector: 'app-movie-modal',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormatDecimalPipe],
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieModalComponent {
  @Input({ required: true }) movie!: Movie;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape') onEsc(): void {
    this.close();
  }

  close(): void {
    this.closed.emit();
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
