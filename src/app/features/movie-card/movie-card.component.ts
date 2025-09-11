import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../core/models/movie.models';
import { FormatDecimalPipe } from '../../shared/pipes/format-decimal.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, FormatDecimalPipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;
  @Input() isLcp = false;
  @Output() open = new EventEmitter<void>();
}
