import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Personal } from 'src/app/models/Personal';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { loginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  datos: Personal[] | any;
  datAux: Personal[] | any;
  displayedColumns: string[] = [
    'Id',
    'Nombre',
    'Apellido',
    'Cedula',
    'Profesion',
    'Sexo',
    'Accion',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  expandedElement: Personal[] | any;
  ordenElements: any = {
    id_pers: true,
    nom_pers: true,
    ape_pers: true,
    cedu_pers: true,
    prof_pers: true,
    sexo_pers: true,
  };
  txtSearch: string = '';
  search: boolean = false;
  dataPie: [] = [];
  dataBar: [] = [];
  session: boolean = false;
  promEdad: number = 0;

  constructor(
    private DataServices: DataService,
    private dialog: MatDialog,
    private loginS: loginService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.session = this.loginS.getSession();
  }

  aplicaPagina() {
    this.datos.paginator = this.paginator;
    this.datos.sort = this.sort;
  }

  applicaFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datos.filter = filterValue.trim().toLowerCase();

    if (this.datos.paginator) {
      this.datos.paginator.firstPage();
    }
  }

  getAll() {
    this.DataServices.getAll(
      this.search == true ? this.txtSearch : ''
    ).subscribe((data: any) => {
      this.datos = new MatTableDataSource(<Personal[]>data);
      this.datAux = data;
      this.aplicaPagina();
      return data;
    });
    this.dataPieChart();
    this.dataBarChar();
  }

  mostrarModal(elemento: Personal) {
    const dialogRef = this.dialog.open(ModalInfoComponent, {
      data: elemento,
      height: '90%',
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAll();
    });
  }

  registrarUsuario() {
    const dialogRef = this.dialog.open(ModalInfoComponent, {
      data: 'registro',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAll();
    });
  }

  ordenar(param: any) {
    if (this.ordenElements[param] == true) {
      this.ordenElements[param] = false;
      this.ordenaObject(this.datAux, param, false);
    } else {
      this.ordenElements[param] = true;
      this.ordenaObject(this.datAux, param, true);
    }
    this.datos = new MatTableDataSource(<Personal[]>this.datAux);
    this.aplicaPagina();
  }

  ordenaObject(objeto: [], param: string, asc: boolean) {
    if (asc) {
      objeto.sort((a: any, b: any) => {
        if (!isNaN(a[param])) {
          return +b[param] - +a[param];
        } else {
          return String(b[param])
            .toLowerCase()
            .localeCompare(String(a[param]).toLowerCase());
        }
      });
    } else {
      objeto.sort((a: any, b: any) => {
        if (!isNaN(a[param])) {
          return +a[param] - +b[param];
        } else {
          return String(a[param])
            .toLowerCase()
            .localeCompare(String(b[param]).toLowerCase());
        }
      });
    }
    return objeto;
  }

  buscar() {
    this.search = true;
    this.getAll();
  }

  formatearSearch() {
    this.txtSearch = '';
    this.search = false;
    this.getAll();
  }

  dataPieChart() {
    this.DataServices.getChartPie().subscribe((res: any) => {
      this.dataPie = res;
    });
  }

  dataBarChar() {
    this.DataServices.getChartBar().subscribe((res: any) => {
      this.dataBar = res;
    });
  }

  alertLogin() {
    let text = 'Porfavor habilita la opción para modificar!';
    this.alertInform(text);
  }

  alertInform(text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'warning',
      title: text,
    });
  }

  drop(event: any) {
    moveItemInArray(this.datos, event.previousIndex, event.currentIndex);
  }
}
