enum Category { Vista, Pendiente }

export class VistaPeliculas {
  private HTML: any = {}; // FIXME: Tipar???

  constructor() {
    this .loadHTML();
    this .cleanPeliculasList(Category.Pendiente);
    this .cleanPeliculasList(Category.Vista);
  }

  /**
   * Load HTML elements
   */
  private loadHTML(): void {
    this .HTML.jsListaPendientes = document.querySelector('.js-lista-pendientes');
    this .HTML.peliculasPendientes = this .HTML.jsListaPendientes.querySelectorAll('li');
    this .HTML.jsListaVistas = document.querySelector('.js-lista-vistas');
    this .HTML.peliculasVistas = this .HTML.jsListaVistas.querySelectorAll('li');
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
