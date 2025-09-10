import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './core/services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.prefetchMovies();
  }
}
