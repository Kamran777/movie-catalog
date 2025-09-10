import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.models';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { SearchInputComponent } from '../../shared/components/search-bar/search-bar.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MovieCardComponent,
    MovieModalComponent,
    SearchInputComponent,
    NotFoundComponent,
  ],
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CataloguePageComponent implements OnInit {
  readonly selectedMovie = signal<Movie | null>(null);
  readonly skeletons = Array.from({ length: 8 });

  constructor(private readonly movieService: MovieService) {}

  get query() {
    return this.movieService.query;
  }

  get isLoading(): boolean {
    return !this.movieService.loaded;
  }

  ngOnInit(): void {
    this.movieService.prefetchMovies();
  }

  movies(): Movie[] | null {
    return this.movieService.movies();
  }

  trackByMovieId = (_index: number, movie: Movie) => movie.id;

  selectMovie(movie: Movie): void {
    this.selectedMovie.set(movie);
  }

  closeModal(): void {
    this.selectedMovie.set(null);
  }

  updateSearchQuery(query: string): void {
    this.movieService.query.set(query);
  }
}
