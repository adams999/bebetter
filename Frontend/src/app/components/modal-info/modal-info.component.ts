import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Personal } from 'src/app/models/Personal';
import { AutoPersonal } from 'src/app/models/AutoPersonal';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { ModalAutosComponent } from '../modal-autos/modal-autos.component';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {
  formulario: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  InsertStatus: boolean = false;
  datos: Personal = {
    id_pers: this.data.id_pers,
    nom_pers: this.data.nom_pers,
    ape_pers: this.data.ape_pers,
    cedu_pers: this.data.cedu_pers,
    fech_nac_pers: moment(this.data.fech_nac_pers).format('YYYY-MM-DD'),
    sexo_pers: this.data.sexo_pers,
    prof_pers: this.data.prof_pers,
    dire_pers: this.data.dire_pers,
    mun_pers: this.data.mun_pers,
    tel_pers: this.data.tel_pers,
    est_pers: this.data.est_pers,
  };
  dateHoy: Date | any;
  dataAutos: AutoPersonal | any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Personal,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private dataService: DataService
  ) {
    this.formulario = this.fb.group(this.datos);
    this.formulario.controls['id_pers'].disable();
    this.InsertStatus = data.id_pers ? true : false;
    this.dateHoy = moment().format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    if (this.data.id_pers != undefined) {
      this.getAutosPersonal(this.data.id_pers);
    }
  }

  getAutosPersonal(id_pers: number) {
    this.dataService.getAutoPersonal(id_pers).subscribe((data) => {
      this.dataAutos = data;
    });
  }

  cerrarModal() {
    this.matDialog.closeAll();
  }

  procesarData(data: Personal | any) {
    data.id_pers = this.datos.id_pers;
    let text = 'Estas Seguro de realizar la actualización?';

    if (this.validaFormulario()) {
      this.alertConfirmacion(text).then((res) => {
        this.dataService
          .updatePersonal(data.id_pers, data)
          .subscribe((res: any) => {
            if (res.STATUS == 'OK') {
              this.alertSuccess();
            }
          });
      });
    } else {
      this.alertInform();
    }
  }

  eliminarRegistro() {
    let text = 'Estas Seguro de Eliminar el Registro?';

    if (this.validaFormulario()) {
      this.alertConfirmacion(text).then((data) => {
        this.dataService
          .deletePersona(this.datos.id_pers)
          .subscribe((res: any) => {
            if (res.STATUS == 'OK') {
              this.alertSuccess();
            }
          });
      });
    } else {
      this.alertInform();
    }
  }

  alertConfirmacion(text: string) {
    let ok = false;
    let promesa = new Promise((resolve, reject) => {
      Swal.fire({
        title: text,
        text: 'Una ves realizado no hay vuelta atras!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si Aplicar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          ok = true;
          resolve(ok);
        } else {
          reject(ok);
        }
      });
    });

    return promesa;
  }

  alertSuccess() {
    Swal.fire({
      position: 'top-end',
      title: 'Acción Realizada Satisfactoriamente!',
      text: 'La transacción se Realizo correctamente ',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
    this.cerrarModal();
  }

  alertInform() {
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
      title: 'Porfavor completa el formulario correctamente!',
    });
  }

  registroUserNew() {
    if (this.validaFormulario()) {
      this.dataService.insertPersona(this.datos).subscribe((res: any) => {
        if (res.SUCCESS == 'OK') {
          this.alertSuccess();
        }
      });
    } else {
      this.alertInform();
    }
  }

  validaFormulario() {
    return this.formulario.status == 'VALID';
  }

  editAuto(auto: any) {
    const dialogRef = this.matDialog.open(ModalAutosComponent, {
      data: auto,
      height: '50%',
      width: '50%',
    });
  }

  registrarAutoPersonal() {
    const dialogRef = this.matDialog.open(ModalAutosComponent, {
      data: { accion: 'registro', id_user: this.data.id_pers },
    });
  }
}
