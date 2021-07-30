import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutoPersonal } from 'src/app/models/AutoPersonal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-autos',
  templateUrl: './modal-autos.component.html',
  styleUrls: ['./modal-autos.component.scss'],
})
export class ModalAutosComponent implements OnInit {
  formulario: FormGroup | any;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  InsertStatus: boolean = false;
  datos: AutoPersonal | any = {
    id_auto: this.data.id_auto,
    auto_auto: this.data.auto_auto,
    marc_auto: this.data.marc_auto,
    year_auto: this.data.year_auto,
    rel_pers_id: this.data.rel_pers_id,
    est_auto: this.data.est_auto,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AutoPersonal | any,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private dataService: DataService
  ) {
    this.InsertStatus = data.accion != 'registro' ? true : false;
    this.formulario = this.fb.group(this.datos);
    this.formulario.controls['id_auto'].disable();
  }

  ngOnInit(): void {}

  cerrarModal() {
    this.matDialog.closeAll();
  }

  procesarData(data: AutoPersonal | any) {
    data.id_auto = this.datos.id_auto;
    data.rel_pers_id = this.datos.rel_pers_id;
    let text = 'Estas Seguro de realizar la actualización?';

    if (this.validaFormulario()) {
      this.alertConfirmacion(text).then((res) => {
        this.dataService
          .updateAutoPersonal(data.id_auto, data)
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

  validaFormulario() {
    return this.formulario.status == 'VALID';
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

  eliminarRegistro() {
    let text = 'Estas Seguro de Eliminar el Registro?';

    if (this.validaFormulario()) {
      this.alertConfirmacion(text).then((data) => {
        this.dataService
          .deleteAutoPersona(this.datos.id_auto)
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

  registroAutoNew() {
    this.datos.rel_pers_id = this.data.id_user;
    if (this.validaFormulario()) {
      this.dataService.insertAutoPersona(this.datos).subscribe((res: any) => {
        if (res.SUCCESS == 'OK') {
          this.alertSuccess();
        }
      });
    } else {
      this.alertInform();
    }
  }
}
