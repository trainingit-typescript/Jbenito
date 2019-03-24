import { ControladorPeliculas } from './controlador-peliculas';
import { Formato, Pelicula } from './datos/pelicula';

enum Category { Pendiente, Vista }

export class VistaPeliculas {
  private HTML: any = {}; // FIXME: Tipar???

  constructor(private peliculasCtrl: ControladorPeliculas) {
    this .loadHTML();
    this .paintPeliculas(Category.Pendiente);
    this .paintPeliculas(Category.Vista);
    this .paintTotals(Category.Pendiente);
    this .paintTotals(Category.Vista);
    this.loadStatistics();
  }

  /**
   * Load HTML elements
   */
  private loadHTML(): void {
    this .HTML.jsListaPendientes = document.querySelector('.js-lista-pendientes');
    this .HTML.peliculasPendientes = this .HTML.jsListaPendientes.querySelectorAll('li');
    this .HTML.jsListaVistas = document.querySelector('.js-lista-vistas');
    this .HTML.peliculasVistas = this .HTML.jsListaVistas.querySelectorAll('li');

    this .HTML.jsPeliculaBase = document.querySelector('.js-pelicula-base');

    this .HTML.jsNPeliculasPendientes = document.querySelector('.js-n-peliculas-pendientes');
    this .HTML.jsNPeliculasVistas = document.querySelector('.js-n-peliculas-vistas');

    this .HTML.jsMejorValorada = document.querySelector('.js-mejor-valorada');
    this .HTML.jsMasOscars = document.querySelector('.js-mas-oscars');
    this .HTML.jsMasReciente = document.querySelector('.js-mas-reciente');
  }

  /**
   * Load statistics
   */
  private loadStatistics():void {
    const paintPelicula = (pelicula: Pelicula, type: string): void => {
      this.HTML[type].querySelector('.js-titulo').textContent = pelicula.titulo
      const cartel = this.HTML[type].querySelector('.js-cartel');
      cartel.src = pelicula.cartel;
      cartel.alt = cartel.title = pelicula.titulo;
    }
    paintPelicula(this.peliculasCtrl.getBestRated(), 'jsMejorValorada');
    paintPelicula(this.peliculasCtrl.getMoreAwarded(), 'jsMasOscars');
    paintPelicula(this.peliculasCtrl.getMoreRecient(), 'jsMasReciente');
  }

  /**
   * Paint totals
   * @param category 
   */
  private paintTotals(category: Category): void {
    this .HTML[`jsNPeliculas${Category[category]}s`].textContent =
      this .peliculasCtrl.getPeliculas(Boolean(category)).length;
  }

  /**
   * Paint peliculas
   * @param category
   */
  private paintPeliculas(category: Category): void {
    const lista = this .HTML[`jsLista${Category[category]}s`] as HTMLElement;
    this .peliculasCtrl.getPeliculas(Boolean(category)).forEach(pelicula => {
      const item = this .HTML.jsPeliculaBase.cloneNode(true);
      item.querySelector('.js-titulo').textContent = pelicula.titulo;
      item.querySelector('.js-director').textContent = pelicula.director;
      item.querySelector('.js-anyo').textContent = pelicula.getYear();
      const cartel = item.querySelector('.js-cartel');
      cartel.src = pelicula.cartel;
      cartel.alt = cartel.title = pelicula.titulo;
      if (pelicula.oscars === 0) {
        item.querySelector('.js-oscars').remove();
      }
      item.querySelector(`.js-formato-${Formato[pelicula.formato].toLowerCase()}`).classList.remove('hide');
      item.querySelector('.js-valoracion').dataset.puntos = pelicula.valoracion;
      for (let i = 1; i <= 5; i++) {
        const estrella = item.querySelector(`.js-valoracion-${i}`);
        estrella.classList.remove('glyphicon-star', 'glyphicon-star-empty');
        estrella.classList.add(pelicula.valoracion >= i && pelicula.vista ? 'glyphicon-star' : 'glyphicon-star-empty');
      }
      lista.appendChild(item);
    });
    this .cleanPeliculasList(category);
  }

  /**
   * Remove peliculas list
   * @param category of the films (enum Category)
   */
  private cleanPeliculasList(category: Category): void {
    const itemList = this .HTML[`peliculas${Category[category]}s`];
    for (const item of itemList) {
      item.remove();
    }
  }
}
