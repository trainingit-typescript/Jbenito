import { ControladorPeliculas } from './controlador-peliculas';
import { VistaPeliculas } from './vista-peliculas';

const peliculasCtrl = new ControladorPeliculas();
peliculasCtrl.loadPeliculas();

new VistaPeliculas(peliculasCtrl);
