import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../servicios/auth.service';
import { ControlCrecimientoService } from '../../control-crecimiento.service';



@Component({
  selector: 'app-control-update-dialog',
  templateUrl: './control-update-dialog.component.html',
  styleUrls: ['./control-update-dialog.component.css']
})
export class ControlUpdateDialogComponent implements OnInit {
  userSession: any;
  constructor(private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data,
     private controlCrecimientoService: ControlCrecimientoService,
    private dialogRef: MatDialogRef<ControlUpdateDialogComponent>
  ) { }

  ngOnInit() {
  }

  editarControlCrecimiento() {
     this.controlCrecimientoService.editar(this.data.controlCrecimiento.id, this.data.controlCrecimiento).subscribe(
         () => {
             this.dialogRef.close();
             this.openSnackBar('OK.!', 'Control actualizado correctamente');
         },
         error => {
             this.dialogRef.close();
             this.openSnackBar('UPS!!!', 'Intentelo más tarde');
         }
     );
  }
  openSnackBar(title: string, message: string) {
    this.snackBar.open(title, message, {
      duration: 8000,
    });
  }

}
