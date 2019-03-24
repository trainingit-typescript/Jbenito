import * as moment from 'moment';
import { PeliculaJSON } from './peliculaJSON';

type Valoracion = 0 | 1 | 2 | 3 | 5;
export enum Formato {
  DVD,
  VHS,
  archivo,
}

export class Pelicula {
  public id: number;
  public titulo: string;
  public director: string;
  public cartel: string;
  public vista: false;
  public formato: Formato;
  public oscars: number;
  public valoracion: Valoracion;
  private fecha: moment.Moment;

  constructor(pelicula: PeliculaJSON) {
    this.id = pelicula.id;
    this.titulo = pelicula.titulo;
    this.director = pelicula.director;
    this.fecha = moment(pelicula.fecha, 'DD-MM-YYYY');
    this.cartel = pelicula.cartel;
    this.vista = pelicula.vista;
    this.formato = Formato[pelicula.formato];
    this.oscars = pelicula.oscars;
    this.valoracion = pelicula.valoracion as Valoracion;
  }

  public getFormato = (): string => Formato[this.formato];

  public getYear = (): string => this.fecha.year().toString();

  public isAfter(pelicula: Pelicula): boolean {
    return this.fecha.isAfter(pelicula.fecha);
  }
}
