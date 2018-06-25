
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from '../../servicios/auth.service';
import { UsuarioService } from '../usuario.service';


@Component({
    styleUrls: ['./usuario-delete-dialog.component.css'],
    templateUrl: './usuario-delete-dialog.component.html'
})
export class UsuarioDeleteDialogComponent implements OnInit {
    userSession: any;

    constructor(
        private snackBar: MatSnackBar,
        private authService: AuthService,
        private usuarioService: UsuarioService,
        private dialogRef: MatDialogRef<UsuarioDeleteDialogComponent>
    ) {
    }

    ngOnInit(): void {
        this.userSession = JSON.parse(localStorage.getItem(AuthService.tokenKey));

    }

    eliminarUsuario() {
        this.usuarioService.eliminar(this.userSession.usuario).subscribe(
            () => {
                this.dialogRef.close();
                this.openSnackBar('OK.!', 'Usuario eliminado correctamente');
                this.authService.logout();
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
