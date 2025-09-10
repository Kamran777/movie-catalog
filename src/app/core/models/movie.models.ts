export interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
  rating: number;
  genres: string[];
  overview: string;
  runtime?: number;
  productionCountries?: string[];
  director?: string;
  cast?: string[];
  language?: string;
  boxOffice?: number;
  trailerUrl?: string;
  contentRating?: string;
}
