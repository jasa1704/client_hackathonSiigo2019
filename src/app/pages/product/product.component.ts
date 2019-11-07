import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/index'
import swal from 'sweetalert';

//Interfaces
import { Usuario } from '../../models/usuario.model';

//Servicio
import { ProductoService, PagerService, UsuarioService } from '../../services/service.index';
import { Option } from 'ng-select/lib/option';
import { element } from 'protractor';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  usuario: Usuario;
  public productos = [];
  public productoAdd = new Producto();
  public productoEdit = new Producto();
  public productoEliminar = new Producto();
  public productoVer = new Producto();
  public Search = '';
  public tipsBusqueda = '';
  public database = [];
  public newArray = [];
  public options = [];

  // Seleccionar bases de datos
  selectedFile = null;
  private allItems: any[];
  public pager: any = {};
  public pagedItems = [];
  predictive;
  selectedItem
  reset
  queryUsed
  searchError


  constructor(
    private productoService: ProductoService,
    private pagerService: PagerService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.GetAllProducts();
    this.database = ["Hola", "Siigo", "Factura","Mujer","Mundo", "Dias", "Programacion"]
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  GetAllProducts() {
    this.productoService.GetProductos(res => {
      this.productos = res.productos;
      this.allItems = this.productos;
      this.setPage(1);
    })
  }

  AddNewProduct() {
    this.productoAdd.tenant_id = this.usuario._id;
    this.productoService.AddProducto(this.productoAdd, res => {
      this.GetAllProducts();
    })
  }

  EditarProducto() {
    this.productoService.EditProducto(this.productoEdit, res => {
      this.GetAllProducts();
    })
  }

  EliminarProducto() {
    this.productoService.EliminarProducto(this.productoEliminar, res => {
      console.log(res);
      this.GetAllProducts();

    })
  }

  restablcerCrearProducto() {
    this.productoAdd = new Producto();
  }

  /* ################## Cargar base de datos ############################ */

  seleccionarArchivos(event) {
    this.selectedFile = event.target.files[0];
  }

  onUploadBaseDatos() {
    if (this.selectedFile != null) {
      this.productoService.OnUploadBaseDatos('productos', this.selectedFile, this.usuario._id, res => {
        if (res.ok) {
          swal('Carga exitosa', 'los productos fueron cargados exitosamente', 'success');
          this.GetAllProducts();
        } else {
          swal('Problemas con el servidor', 'Error al cargar los productos', 'error');
        }
      })
    } else {
      swal('Advertencia ', 'Debes seleccionar y cargar la base de datos antes de continuar', 'warning');
    }
  }

  async autocomplete(word) {
    const words = this.splitText(word);

    

    this.newArray = await this.database.filter(item => {
      for (const palabraComparar of words) {
        let coincide = item.toString().toLowerCase().indexOf(palabraComparar.toLowerCase());

        if (coincide === -1) {
          return false
        } else {
          return true;
        }
      }
    })

    console.log("Nuevas palabras", this.newArray)

    let localOptions = []
    this.tipsBusqueda = '';

    this.newArray.forEach(element =>{

      this.tipsBusqueda += ' ' + element;
    });


    

    debugger

  }

  splitText(search: string) {
    let existeEspacioAlFinal: boolean = false;
    let index: any;
    let palabra: any;
    let palabras: any = [];
    while (search.indexOf(' ') !== -1) {
      index = search.indexOf(' ');
      palabra = search.substring(0, index);
      palabras.push(palabra);
      if (index + 1 === search.length) {
        existeEspacioAlFinal = true;
        break;
      } else {
        search = search.substring(index + 1, search.length);
      }
    }
    if (!existeEspacioAlFinal) palabras[palabras.length] = search;
    return palabras;
  };

}
