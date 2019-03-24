import { ControladorPeliculas } from './controlador-peliculas';
import { Formato } from './datos/pelicula';

enum Category { Pendiente, Vista }

export class VistaPeliculas {
  private HTML: any = {}; // FIXME: Tipar???

  constructor(private peliculasCtrl: ControladorPeliculas) {
    this .loadHTML();
    // this .cleanPeliculasList(Category.Pendiente);
    // this .cleanPeliculasList(Category.Vista);
    this .paintPeliculas(Category.Pendiente);
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

  }

  private paintPeliculas(category: Category): void {
    this .cleanPeliculasList(category);
    const lista = this .HTML[`jsLista${Category[category]}s`] as HTMLElement;
    this .peliculasCtrl.getPeliculas(Boolean(category)).forEach(pelicula => {
      console.log('pleivula', pelicula);
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



      // nuevoItem.querySelector(".cliente-proveedor-n-facturas").textContent = clienteProveedor.nFacturas;
      lista.appendChild(item);
    });
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
