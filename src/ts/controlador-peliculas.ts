
import { Pelicula } from './datos/pelicula';
import { PeliculaJSON } from './datos/peliculaJSON';
import * as data from './peliculas.json';

export class ControladorPeliculas {
  private peliculas: Pelicula[];

  public loadPeliculas(): void {
    this .peliculas = data.peliculas.map(pelicula => new Pelicula(pelicula as PeliculaJSON));
  }

}
