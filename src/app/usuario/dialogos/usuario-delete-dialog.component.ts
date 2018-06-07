
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from '../../servicios/auth.service';

@Component({
    styleUrls: ['./usuario-delete-dialog.component.css'],
    templateUrl: './usuario-delete-dialog.component.html'
})
export class UsuarioDeleteDialogComponent implements OnInit {

    constructor(
        private snackBar: MatSnackBar,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {

    }

  /*  private eliminarPersona(id: number) {
        this.personaService.eliminar(id).subscribe(
            () => {
                this.dialogRef.close();
                this.openSnackBar('OK.!', 'Datos eliminados correctamente');
            },
            error => {
                this.dialogRef.close();
                this.openSnackBar('UPS!!!', 'Intentelo más tarde');
            }
        );

    }*/

    openSnackBar(title: string, message: string) {
        this.snackBar.open(title, message, {
            duration: 8000,
        });
    }
} 