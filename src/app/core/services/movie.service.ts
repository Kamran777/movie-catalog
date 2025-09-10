import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { Movie } from '../models/movie.models';
import { generateQueryVariants } from '../utils/transliteration';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private _movies = signal<Movie[] | null>(null);
  public query = signal('');
  private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  readonly movies = computed(() => {
    const all = this._movies();
    const q = this.query().trim().toLowerCase();
    if (!all) return null;
    if (!q) return all;

    const variants = generateQueryVariants(q);
    return all.filter((m) => {
      const title = (m.title || '').toLowerCase();
      return variants.some((v) => title.includes(v));
    });
  });

  get loaded(): boolean {
    return this._movies() !== null;
  }

  prefetchMovies(): void {
    if (this._movies() !== null) return;
    this.fetchMovies().subscribe((list: Movie[]) => this._movies.set(list));
  }

  private fetchMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      catchError((err) => {
        console.error('Failed to load movies', err);
        return of([] as Movie[]);
      }),
      shareReplay(1)
    );
  }
}
