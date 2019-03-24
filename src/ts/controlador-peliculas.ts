
import { Pelicula } from './datos/pelicula';
import { PeliculaJSON } from './datos/peliculaJSON';
import * as data from './peliculas.json';

export class ControladorPeliculas {
  private peliculas: Pelicula[] = [];
  private vistas: Pelicula[] = [];
  private pendientes: Pelicula[] = [];

  public loadPeliculas(): void {
    this.peliculas = data.peliculas.map(pelicula => new Pelicula(pelicula as PeliculaJSON));
    this.splitPeliculas();
  }

  private splitPeliculas(): void {
    this.vistas = [];
    this.pendientes = [];
    this.peliculas.forEach(pelicula => {
      if (pelicula.vista) {
        this.vistas.push(pelicula);
      } else {
        this.pendientes.push(pelicula);
      }
    });
  }

  public getPeliculas(vistas: boolean): Pelicula[] {
    return vistas ? this.vistas : this.pendientes;
  }

  public getBestRated(): Pelicula {
    return this.peliculas.reduce((peliculaA, peliculaB) => 
      peliculaA.valoracion > peliculaB.valoracion ? peliculaA : peliculaB
    )
  }

  public getMoreAwarded(): Pelicula {
    return this.peliculas.reduce((peliculaA, peliculaB) => 
      peliculaA.oscars > peliculaB.oscars ? peliculaA : peliculaB
    )
  }

  public getMoreRecient(): Pelicula {
    return this.peliculas.reduce((peliculaA, peliculaB) => 
      peliculaA.isAfter(peliculaB) ? peliculaA : peliculaB
    )
  }
}
